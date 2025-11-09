import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f8ff;
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
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const SearchFlightPage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder: Replace with API call
    setResults([
      { id: 1, flight: "FN123", origin, destination, date },
      { id: 2, flight: "FN456", origin, destination, date },
    ]);
  };

  return (
    <Wrapper>
      <Card>
        <Title>Search Flights</Title>
        <form onSubmit={handleSearch}>
          <Input placeholder="Origin" value={origin} onChange={e => setOrigin(e.target.value)} />
          <Input placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Button type="submit">Search</Button>
        </form>
        {results.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Results:</h3>
            <ul>
              {results.map(r => (
                <li key={r.id}>{r.flight} - {r.origin} to {r.destination} on {r.date}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </Wrapper>
  );
};

export default SearchFlightPage;
