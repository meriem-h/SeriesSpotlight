import React from "react";
import Random from "./carouselle/RandomShow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Home() {
  // const [newShow, setNewShow] = useState({});

  // useEffect(() => {
  //   console.log(newShow);
  // }, [newShow]);

  // useEffect(() => {
  //   const options = { method: "GET", headers: { "X-BetaSeries-Key": API_KEY } };

  //   fetch("https://api.betaseries.com/shows/random?nb=20", options)
  //     .then((res) => res.json())
  //     .then((res) => setNewShow(res.shows))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <main>
      <h1>page home</h1>
      <section>
        <article className="flex flex-col items-center">
          <h1>Ma liste : </h1>
          <Random />
        </article>
        <article className="flex flex-col items-center">
          <h1>A découvrire : </h1>
          <Random />
        </article>
        <article className="flex flex-col items-center">
          <h1>le plus poulaire : </h1>
          <Random />
        </article>
        <article className="flex flex-col items-center">
          <h1>A découvrire : </h1>
          <Random />
        </article>
      </section>
    </main>
  );
}
