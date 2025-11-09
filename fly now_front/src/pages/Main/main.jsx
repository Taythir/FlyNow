import React, { useState } from "react";
import styled from "styled-components";
import flightImage from "../../image/main_flight.jpeg";
import hotelImage from "../../image/main_hotel.jpeg";
import FlightsTab from "./tabFlight"
import HotelTab from "./tabHotel"

const PageWrapper = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  transition: background-image 0.8s ease-in-out;
  height: 100vh;
  color: white;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35); 
  z-index: 0;
`;

const Header = styled.header`
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 48px;
  backdrop-filter: blur(5px);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #00bfff;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavButton = styled.button`
  background: ${(props) => (props.active ? "#00bfff" : "transparent")};
  border: none;
  color: white;
  font-size: 1rem;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #00bfff;
  }
`;

const SearchArea = styled.div`
  background-color: rgba(0, 0, 0, 0.45);
  margin: 100px auto;
  padding: 40px;
  width: 60%;
  border-radius: 16px;
  text-align: center;
  backdrop-filter: blur(3px);
  font-size: 1.3rem;
`;

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("Flights");


  const backgroundImages = {
    Flights: flightImage,
    Hotels: hotelImage,
  };

  return (
    <PageWrapper bgImage={backgroundImages[activeTab]}>
      <Overlay/>
      <Header>
        <Logo>FlyNow</Logo>
        <Nav>
          {["Flights", "Hotels"].map((tab) => (
            <NavButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </NavButton>
          ))}
        </Nav>
      </Header>

      <SearchArea>
        {activeTab === "Flights" && <FlightsTab/> }
        {activeTab === "Hotels" && <HotelTab/> }
      </SearchArea>
    </PageWrapper>
  );
}
