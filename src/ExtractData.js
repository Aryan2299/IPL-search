import React from "react";
import InfoCard from "./InfoCard";

//renders cards from data received by props
const ExtractData = (props) => {
  return props.fileContent.map((item, index) => {
    return <InfoCard key={index} fileContentObject={item} />;
  });
};

export default ExtractData;
