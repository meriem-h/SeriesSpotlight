import React from "react";
import Header from "./Header";
const API_KEY = process.env.REACT_APP_API_KEY

export default function Home() {

  const options = {
    method: "GET",
    headers: { "X-BetaSeries-Key": API_KEY },
  };

  fetch("https://api.betaseries.com/members/infos", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  return (
    <div>
      <h1>page home</h1>
      <>
        <Header />
      </>
    </div>
  );
}
