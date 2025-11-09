// ...existing code from BookFlightPage.jsx...
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  color: #28a745;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const BookFlightPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flight, setFlight] = useState("");
  const [success, setSuccess] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    // Placeholder: Replace with API call
    setSuccess(true);
  };

  return (
    <Wrapper>
      <Card>
        <Title>Book Flight</Title>
        <form onSubmit={handleBook}>
          <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Flight Number" value={flight} onChange={e => setFlight(e.target.value)} />
          <Button type="submit">Book</Button>
        </form>
        {success && <p style={{ color: '#28a745', marginTop: '1rem' }}>Booking successful!</p>}
      </Card>
    </Wrapper>
  );
};

export default BookFlightPage;
