import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

// Styled Components
const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9fa;
`;

const ChatWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 500px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 800px;
`;

const MessageContainer = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  padding: 10px;
  background: #fafafa;
  overflow-y: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  text-align: ${({ user }) => (user ? "right" : "left")};
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ user }) => (user ? "#f1f1f1" : "#f1f1f1")};
  color: ${({ user }) => (user ? "#333" : "#333")};
  min-width: 30%;
  max-width: 70%;
  align-self: ${({ user }) => (user ? "flex-end" : "flex-start")};
  font-family: 'Arial', sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  margin-right: 10px;
  background: #f1f1f1;
  color: #333;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  &::placeholder {
    color: #888;
  }
`;

const ChatBot = () => {
  const location = useLocation();
  const { age, occupation, tobacco, coverage } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);

      const formData = {
        age,
        coverage_amt: coverage,
        tobacco,
        occupation,
        prompt: input,
        message: messages,
      };

      setInput("");
      try {
        const res = await axios.post("http://localhost:5000/res", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const botResponse = res.data.response;


        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Bot Answer: ${botResponse}`, user: false },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatWrapper>
        <Title>Chat with our Bot</Title>
        <MessageContainer>
          {messages.map((msg, index) => (
            <Message key={index} user={msg.user}>
              {msg.text.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </Message>
          ))}
          <div ref={ref} />
        </MessageContainer>
        <InputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
        </InputContainer>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default ChatBot;
