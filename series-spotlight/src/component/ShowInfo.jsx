import React from "react";
import Random from "./carouselle/RandomShow";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function ShowInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);

  const options = {
    method: "GET",
    headers: { "X-BetaSeries-Key": API_KEY },
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "X-BetaSeries-Key": API_KEY },
    };

    fetch(`https://api.betaseries.com/shows/display?id=${id}`, options)
      .then((res) => res.json())
      .then((res) => setInfo(res.show))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <main className="">
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*             fiche serie              */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section className="flex gap-4 w-[90%] p-6 bg-slate-700 bg-opacity-80 m-auto">
        {/* info left side */}
        <aside className="w-[27%]">
          <ul>
            <div>
              <li>Pays : </li>
              <li className="ml-4">{info.country}</li>
            </div>
            <div>
              <li>Genres : </li>
              <li className="ml-4">
                {info.genres &&
                  Object.values(info.genres).map((genre) => {
                    return <p>{genre}</p>;
                  })}
              </li>
            </div>
            <div>
              <li>Episodes : </li>
              <li className="ml-4">
                {info.episodes} ({info.seasons} saison)
              </li>
            </div>
            <div>
              <li>Statut : </li>
              <li className="ml-4">{info.status}</li>
            </div>
          </ul>
        </aside>

        {/* description middle */}
        <article>
          <h1>{info.title}</h1>

          <figure className="w-[40%] h-[3em] flex">
            {info.platforms &&
              info.platforms.svods &&
              info.platforms.svods.map((platform) => (
                <img
                  src={platform.logo}
                  alt={platform.name}
                  key={platform.id}
                  className={`rounded-md px-3 mx-1 bg-[${platform.color}] object-cover`}
                />
              ))}
          </figure>

          <p>{info.description}</p>
        </article>

        {/* poster right */}
        <figure className="flex w-[27%]">
          <img
            src={info.images?.poster}
            alt={info.title}
            className="rounded-2xl"
          />
        </figure>
      </section>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          liste des saison            */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section className="flex gap-4">
        {info.seasons_details &&
          info.seasons_details.map((season, index) => (
            <figure key={index} className="relative w-[17%] ">
              <img
                src={info.images?.show}
                alt={info.title}
                className="rounded-2xl w-full blur-[1px]"
              />
              <figcaption className="absolute inset-0 flex justify-center items-center">
                <p className="text-center text-shadow">
                  saison : {season.number} - {season.episodes} épisodes
                </p>
              </figcaption>
            </figure>
          ))}
      </section>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          liste des acteur            */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section></section>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*              similaire               */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section></section> {/*   titre similaire */}
      {/*  */}
    </main>
  );
}
