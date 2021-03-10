import React from "react";

import deliveries from "./static/archive/deliveries";
import matches from "./static/archive/matches";
import most_runs_average_strikerate from "./static/archive/most_runs_average_strikerate";
import teams from "./static/archive/teams";
import players from "./static/archive/players";
import teamwise_home_and_away from "./static/archive/teamwise_home_and_away";
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

const categoriesAll = [
  ...deliveries.results,
  ...matches.results,
  ...most_runs_average_strikerate.results,
  ...players.results,
  ...teams.results,
  ...teamwise_home_and_away.results,
];

const categoriesFixed = [
  deliveries.results,
  matches.results,
  most_runs_average_strikerate.results,
  players.results,
  teams.results,
  teamwise_home_and_away.results,
];

//main function component, rendered in App
const Dashboard = (props) => {
  //selects dataset to be displayed
  const [fileContent, setFileContent] = React.useState([]);
  const [start, setStart] = React.useState(0);

  //checks if array returned by getData is the last one
  const [isLastArray, setIsLastArray] = React.useState(false);

  //sets dataset values from categoriesAll or categoriesFixed
  const [currentFilter, setCurrentFilter] = React.useState();

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

  //fetches data and sets value of currentFilter
  const showData = () => {
    console.time();

    getData(currentFilter, start, start + 10)
      .then((result) => {
        setFileContent(result);
        console.timeEnd();
      })
      .catch((err) => console.log(err));
  };

  //lifecycle to ensure functionality on changes to dependencies (from dependency array)
  React.useEffect(() => {
    showData();

    if (currentFilter) {
      let current_filter_length = currentFilter.length;

      setIsLastArray(current_filter_length - start < 10 ? true : false);
    }
  }, [currentFilter, start, isLastArray]);

  //to use memoization, limit re-renders
  const NavigateResults = React.memo(() => {
    const inc = React.useCallback(() => {
      setStart((c) => c + 10);
      if (isLastArray) {
        setStart(0);
      }
    }, []);

    const dec = React.useCallback(() => {
      setStart((c) => c - 10);
    }, []);

    //buttons to navigate dataset
    return currentFilter ? (
      <div>
        <button
          type="button"
          disabled={start < 10}
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
            setCurrentFilter(
              displayAll
                ? categoriesAll
                : [...categoriesFixed[1], ...categoriesFixed[3]]
            );
            showData();
          }}
          className="search-btn"
        >
          Search
        </button>
      </div>

      <div
        id="next-prev-btns"
        style={{ backgroundColor: currentFilter ? "black" : "none" }}
      >
        <NavigateResults />
      </div>
      <div id="cards-display-div">
        {fileContent.length !== 0 ? (
          <ExtractData fileContent={fileContent} />
        ) : (
          <h1>Landing Page</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
