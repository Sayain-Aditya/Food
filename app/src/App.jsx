import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { SearchResult } from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [Data, SetData] = useState(null);
  const [FilteredData, SetFilteredData] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [Error, SetError] = useState(null);
  const [SelectedBtn, SetSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      SetLoading(true);
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();
        SetData(json);
        SetFilteredData(json);
        SetLoading(false);
      } catch (error) {
        SetError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  console.log(Data);

  const searchfood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue == "") {
      SetFilteredData(null);
    }
    const filter = Data.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    SetFilteredData(filter);
  };

  const filterfood = (type) => {
    if (type == "all") {
      SetFilteredData(Data);
      SetSelectedBtn("all");
      return;
    }
    const filter = Data.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    SetFilteredData(filter);
    SetSelectedBtn(type);
  };

  const filterBtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (Error) return <div>{Error}</div>;
  if (Loading) return <div>Loading.....</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/Logo.svg" alt="Logo" />
          </div>
          <div className="search">
            <input onChange={searchfood} placeholder="Search Food"></input>
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtn.map((value) => (
            <Button
              isSelcted={SelectedBtn == value.type}
              key={value.name}
              onClick={() => filterfood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult Data={FilteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 48px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelcted }) => (isSelcted ? "#420404" : "#ff4343")};
  outline:1px solid ${({ isSelcted }) => (isSelcted ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #420404;
  }
`;
