
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    FaUser,
    FaBriefcase,
    FaSmoking,
    FaShieldAlt
} from "react-icons/fa";

import styled, { keyframes } from "styled-components";
// Animation Keyframes
const cu1 = keyframes`
  0%    {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
  16.67%{-webkit-mask-size:18px 18px,0    0  ,0    0  ,auto}
  33.33%{-webkit-mask-size:18px 18px,18px 18px,0    0  ,auto}
  50%   {-webkit-mask-size:18px 18px,18px 18px,18px 18px,auto}
  66.67%{-webkit-mask-size:0    0  ,18px 18px,18px 18px,auto}
  83.33%{-webkit-mask-size:0    0  ,0    0  ,18px 18px,auto}
  100%  {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
`;

// Custom Loader Style
const Loader = styled.div`
  width: 70px;
  height: 26px;
  background: #6ef1f4;
  border-radius: 50px;
  --c: radial-gradient(farthest-side, #000 92%, #0000);
  --s: 18px 18px;
  -webkit-mask: var(--c) left 4px top 50%, var(--c) center,
    var(--c) right 4px top 50%, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  -webkit-mask-repeat: no-repeat;
  animation: ${cu1} 1.5s infinite;
`;

// Home Form Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("images/background5.avif");
  backdrop-filter: blur(1000px);
  background-size:cover;
`;

const FormWrapper = styled.div`
  background: rgba(117, 117, 116, 0.5); // Adjust the transparency level here
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 1;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  color: #fafaf7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  flex: 1;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #fafaf7;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Button = styled.button`
  background: #5ad2ed;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1fd4c4; // Darker shade for hover effect
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;
const Home = () => {
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [tobacco, setTobacco] = useState("");
    const [coverage, setCoverage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (age < 18) {
            setError("Age must be above 18");
            return;
        }
        if (!occupation || !tobacco || !coverage) {
            setError("All fields are required");
            return;
        }
        setError("");
        setLoading(true);



        try {


            setLoading(false);
            navigate("/chat", {
                state: { age, coverage, tobacco, occupation },
            });
        } catch (error) {
            console.error("Error submitting the form", error);
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Enter your details</Title>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>
                            <FaUser style={{ marginRight: "10px" }} /> Age:
                        </Label>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <FaBriefcase style={{ marginRight: "10px" }} /> Occupation:
                        </Label>
                        <Select
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="salaried">Salaried</option>
                            <option value="self-employed">Self Employed</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <FaSmoking style={{ marginRight: "10px" }} /> Tobacco Use:
                        </Label>
                        <Select
                            value={tobacco}
                            onChange={(e) => setTobacco(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <FaShieldAlt style={{ marginRight: "10px" }} /> Coverage:
                        </Label>
                        <Select
                            value={coverage}
                            onChange={(e) => setCoverage(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="10000000">1 Cr</option>
                            <option value="15000000">1.5 Cr</option>
                        </Select>
                    </FormGroup>
                    {error && <Error>{error}</Error>}
                    <Button type="submit">{loading ? <Loader /> : "Submit"}</Button>
                </Form>
            </FormWrapper>
        </Container>
    );
};
export default Home;