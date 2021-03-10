import React from "react";

import deliveries from "./static/archive/deliveries";
import matches from "./static/archive/matches";
import most_runs_average_strikerate from "./static/archive/most_runs_average_strikerate";
import teams from "./static/archive/teams";
import players from "./static/archive/players";
import teamwise_home_and_away from "./static/archive/teamwise_home_and_away";
import ExtractData from "./ExtractData";

import "./App.css";

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

const Dashboard = (props) => {
  const [fileContent, setFileContent] = React.useState([]);
  const [start, setStart] = React.useState(0);
  const [isLastArray, setIsLastArray] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState();
  const [displayAll, setDisplayAll] = React.useState(true);

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

  const showData = () => {
    console.time();

    getData(currentFilter, start, start + 10)
      .then((result) => {
        setFileContent(result);
        console.timeEnd();
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    showData();

    if (currentFilter) {
      let current_filter_length = currentFilter.length;

      setIsLastArray(current_filter_length - start < 10 ? true : false);
    }
  }, [currentFilter, start, isLastArray]);

  const Component = React.memo(() => {
    const inc = React.useCallback(() => {
      setStart((c) => c + 10);
      if (isLastArray) {
        setStart(0);
      }
    }, []);

    const dec = React.useCallback(() => {
      setStart((c) => c - 10);
    }, []);

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
        <Component />
      </div>
      <div id="cards-display-div">
        {fileContent.length !== 0 ? (
          <ExtractData fileContent={fileContent} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
