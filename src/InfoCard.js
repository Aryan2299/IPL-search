import React from "react";
import "./App.css";

const InfoCard = (props) => {
  const player_info_card = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    margin: "5px",
  };

  const player_info_card_body = {
    width: "15%",
    height: "50px",
    fontSize: "80%",
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <ul id="player-info-card" style={player_info_card}>
      {Object.keys(props.fileContentObject).map((item, index) => {
        return (
          <ol
            key={index}
            style={player_info_card_body}
            className="player-info-card-body"
          >
            <li
              className="player-info-card-body-key"
              style={{ fontSize: "80%", color: "rgb(90,90,90)" }}
            >
              {item}
            </li>
            <li
              className="player-info-card-body-value"
              style={{ fontSize: "100%", textOverflow: "ellipsis" }}
            >
              {props.fileContentObject[item] === ""
                ? (props.fileContentObject[item] = "__")
                : props.fileContentObject[item]}
            </li>
          </ol>
        );
      })}
    </ul>
  );
};

export default InfoCard;
