import React from "react";

import ExtractData from "./ExtractData";

import "./App.css";

//returns ranged data from desired dataset
export async function getData(data, start, end) {
  return data.slice(start, end);
}

const filtersObject = [
  "Deliveries",
  "Matches",
  "Most Runs Average Strikerate",
  "Players",
  "Teams",
  "Teamwise Home and Away",
];

//main function component, rendered in App
const Dashboard = () => {
  //selects dataset to be displayed
  const [fileContent, setFileContent] = React.useState([]);

  const [start, setStart] = React.useState(0);

  //checks if array returned by getData is the last one
  const [isLastArray, setIsLastArray] = React.useState(false);

  //toggle between all filters and only a few at a time
  const [displayAll, setDisplayAll] = React.useState(true);

  //shows button filters
  const RenderFilters = () => {
    return (
      <ul id="filter-buttons">
        <li className="filter-button-list-item">
          <button
            type="button"
            className="btn filter-btn"
            style={{
              background: displayAll ? "rgb(40,40,40)" : "white",
              color: displayAll ? "white" : "black",
              border: "1px solid rgb(40,40,40)",
            }}
            onClick={() => {
              setDisplayAll(!displayAll);
            }}
          >
            All
          </button>
        </li>
        {filtersObject.map((item, index) => {
          return (
            <li key={index} className="filter-buttons-name">
              <button
                type="button"
                className="btn filter-btn"
                style={{
                  background: displayAll
                    ? "black"
                    : index === 1 || index === 3
                    ? "black"
                    : "white",

                  color: displayAll
                    ? "white"
                    : index === 1 || index === 3
                    ? "white"
                    : "black",
                  border: "1px solid black",
                }}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  //fetches data form backend
  const showData = () => {
    console.time();
    let url = displayAll
      ? `https://ipl-search-server.herokuapp.com/all/${start}`
      : `https://ipl-search-server.herokuapp.com/random/${start}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setFileContent(response.data);
        setIsLastArray(response.isLast);
        console.timeEnd();
      });
  };

  // lifecycle to ensure functionality on changes to dependencies (from dependency array)
  React.useEffect(() => {
    showData();
  }, [start]);

  //to use memoization, limit re-renders
  const NavigateResults = React.memo(() => {
    const inc = React.useCallback(() => {
      setStart((c) => c + 1);
      if (isLastArray) {
        setStart(0);
      }
    }, []);

    const dec = React.useCallback(() => {
      setStart((c) => c - 1);
    }, []);

    //buttons to navigate dataset
    return fileContent !== [] ? (
      <div>
        <button
          type="button"
          disabled={start === 0}
          className="prev-next-btn"
          onClick={dec}
        >
          Prev
        </button>

        <button
          type="button"
          disabled={isLastArray}
          className="prev-next-btn"
          onClick={inc}
        >
          Next
        </button>
      </div>
    ) : null;
  });

  return (
    <div id="dashboard-div-outermost">
      <div id="search-and-filters-div">
        <input
          id="search-bar"
          type="text"
          placeholder="Search..."
          autoFocus
        ></input>

        <RenderFilters />

        <button
          type="button"
          onClick={() => {
            setStart(0);
            showData();
          }}
          className="search-btn"
        >
          Search
        </button>
      </div>

      <div
        id="next-prev-btns"
        style={{ backgroundColor: fileContent ? "black" : "none" }}
      >
        <NavigateResults />
      </div>
      <div id="cards-display-div">
        {fileContent !== [] ? (
          <ExtractData fileContent={fileContent} />
        ) : (
          <h1>Landing Page</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
