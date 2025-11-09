import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import bg from "../../image/loginbg.png";
import "../../api/api"
import {apiPost} from "../../api/api";

// ===== Styled Components =====
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
  background: rgba(255, 255, 255, 0.88);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
  margin-right: 5px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  } 
`;

const DateInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Help = styled.small`
  display: block;
  margin-top: 4px;
  color: #666;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #9cbce8;
    cursor: not-allowed;
  }
`;

const SignupButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  font-size: 1rem;
`;

const CancelButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const GenderSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;


export default function Signup() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
  });
  const [idChecked, setIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "id") setIdChecked(false);
  };

  const handleCheckId = async () => {
    if (formData.id.trim() === "") {
      alert("Please enter an ID first.");
      return;
    }

    try {

      const response = await fetch(`${API_BASE_URL}/users/${formData.id}`);
      const data = await response.json();

      if (data.user == "") {
        alert(`ID "${formData.id}" is available ✅`);
        setIdChecked(true);
      } else {
        alert("This ID is already taken ❌");
        setIdChecked(false);
      }
    } catch (error) {
      console.error("Error checking ID:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await apiPost("/users", formData)

    if (response.code == 1) {
      alert("Successfully created")
      navigate("/");
    } else {
      alert("Cannot create new user")
    }

  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Background>
      <Card>
        <Title>🧾 Sign Up</Title>
        <form onSubmit={handleSignup}>
          <InputGroup>
            <Label>User ID</Label>
            <InputRow>
              <Input
                type="text"
                name="id"
                placeholder="Enter your ID"
                value={formData.id}
                onChange={handleChange}
                required
              />
              <Button type="button" onClick={handleCheckId}>
                Check ID
              </Button>
            </InputRow>
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Gender</Label>
            <GenderSelect
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </GenderSelect>
          </InputGroup>

          <InputGroup>
            <Label>Date of Birth</Label>
              <DateInput
                type="date"
                name="dob"
                placeholder="YYYY-MM-DD"
                value={formData.dob}
                onChange={handleChange}
                required

                min="1900-01-01"
                max={new Date().toISOString().slice(0, 10)}
              />
              <Help>Format: YYYY-MM-DD</Help>
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>

          {/* ✅ Sign Up + Cancel */}
          <SignupButton type="submit" disabled={!idChecked}>
            Sign Up
          </SignupButton>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
        </form>
      </Card>
    </Background>
  );
}
