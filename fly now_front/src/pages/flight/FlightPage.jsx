import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #fff 100%);
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  text-align: center;
`;

const Title = styled.h1`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 0 16px;
  font-size: 18px;
  color: #007bff;
  background: #e3f2fd;
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #bbdefb;
  }
`;

const FlightPage = () => {
  return (
    <Wrapper>
      <Card>
        <Title>Flight Page</Title>
        <div style={{ marginTop: '30px' }}>
          <StyledLink to="/search-flight">Search Flights</StyledLink>
          <StyledLink to="/book-flight" style={{ color: '#28a745' }}>Book a Flight</StyledLink>
        </div>
      </Card>
    </Wrapper>
  );
};

export default FlightPage;
