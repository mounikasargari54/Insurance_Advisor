from flask import Flask, request, jsonify
import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch
import ollama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('sentence-transformers/multi-qa-MiniLM-L6-cos-v1')


df = pd.read_csv('C:/Users/Abhijeet/OneDrive/Documents/New folder/PolicyX/data/vector_dataset.csv')

def to_list(x):
    x = x.strip("[]")
    return [float(i) for i in x.split() if i]

df['embeddings'] = df['embeddings'].apply(to_list)

# Function to get similar items based on the input text
def get_similarities(text, df, top_n):
    encoded = model.encode(text)
    similarities = util.pytorch_cos_sim(encoded, df['embeddings'])
    indices = similarities.argsort(descending=True, axis=1)[0][:top_n]
    items = df.iloc[indices][['premium_monthl_buyNow','Term','Tobacco','SA','Plan','Company','claim_ratio','death_due_to_accident','plan_description','offer_highlight',
            'solvency_ratio','average_claim_trend','claim_settlement_promises','term','age','occupation_type']]
    return items

def prompt_formatter(prompt, retrieved_results):
    formatted_results ="Company|Insurance Plan Name|Claim Settlement|Solvency Ratio|Average claim trend|Plan description|Sum Assured(in Rupees)|Monthly Premium(in Rupees)|Age"+ "\n".join([f"Result {i+1}:\n"
                                  
                                   f" {row['Company']}|"
                                   f" {row['Plan']}|"
                                   f" {row['claim_settlement_promises']}|"
                                   f" {row['solvency_ratio']}|"
                                   f" {row['average_claim_trend']}|"
                                   f" {row['plan_description']}|"
                                   f" {row['SA']}|"
                                   f" {row['premium_monthl_buyNow']}|"
                                   f" {row['age']}|\n" for i, row in retrieved_results.iterrows()])
    formatted_prompt = f"You are a Insurance advisor. As a chat bot provide clear and consise answer to user from previous responses or the following context.Context: User details are {prompt}:\n{formatted_results}"
    return formatted_prompt





@app.route('/res', methods=['POST'])
def res():
    try:
        data = request.get_json()
        print(data)
        age = data['age']
        tobacco = data['tobacco']
        occupation_type=data['occupation']
        coverage_amount=data['coverage_amt']
        prompt = data['prompt']
        message=data['message']
        chat = []
        for i in message:
            chat.append({"role": "user" if i['user'] else "assistant","content":i['text']})
        print(message)
        if(not prompt):
            return jsonify({"err":"err"})
        result = get_similarities(f'{tobacco} {coverage_amount} {age} {occupation_type}', df, 3)
        print(age,tobacco,occupation_type,coverage_amount,prompt)
        result.drop_duplicates()
        if(str(coverage_amount)=='10000000'):
            coverage_amount='1 Crore'
        
        else:
            coverage_amount='1.5 Crore'
        
        details = f'Sum Assured(requested by user):{coverage_amount} Age of user:{age} occupation type of user:{occupation_type}'
         
        chat.append( {  
                "role": "user", "content": f"{prompt}\n" })
        
        chat.append( {
                "role":"system","content":f"{prompt_formatter(details,result)}"
            })
        output=ollama.chat('mistral',messages=chat)
       
        print(output)
        output=output['message']['content']
        return jsonify({"response": output})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '_main_':
    app.run(debug=True)
