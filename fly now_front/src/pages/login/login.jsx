import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bg from "../../image/loginbg.png";
import {apiPost} from "../../api/api";

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
`;


const Title = styled.h2`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;


const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;


const Button = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


const SignupText = styled.p`
  margin-top: 12px;
  font-size: 0.9rem;
  color: #555;
  a {
    color: #007bff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",

  });
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await apiPost("/login", loginForm)
    if (response.code == 1) {
      navigate("/main");
    } else {
      alert(response.message)
    }


  };

  return (
    <Background>
      <Card>
        <Title>✈️ FlyNow</Title>
        <form>
          <Input
              type="text"
              placeholder="User ID"
              value={loginForm.id}
              onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
              required
          />
          <Input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required />
          <Button type="submit" onClick={handleLogin}>Login</Button>
        </form>
        <SignupText>
          Don’t have an account? <a href="#" onClick={() => navigate("/signup")}>Sign up</a>
        </SignupText>
      </Card>
    </Background>
  );
}