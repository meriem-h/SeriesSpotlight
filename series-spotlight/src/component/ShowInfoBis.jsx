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

  const picture =
    "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg";

  const options = {
    method: "GET",
    headers: { "X-BetaSeries-Key": API_KEY },
  };

  useEffect(() => {
    const fetchShowDetails = fetch(
      `https://api.betaseries.com/shows/display?id=${id}`,
      options
    ).then((res) => res.json());

    const fetchActor = fetch(
      `https://api.betaseries.com/shows/characters?id=${id}`,
      options
    ).then((res) => res.json());

    Promise.all([fetchShowDetails, fetchActor])
      .then(([showDetails, actor]) => {
        setInfo({
          ...showDetails.show,
          ...actor,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <main className="w-[75%] p-6 m-auto">
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*             fiche serie              */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section>
        <h1 className="border-b-2">{info.title}</h1>

        <div className=" rounded-t-2xl mt-4 pb-4 bg-slate-700 bg-opacity-80">
          {/* image, genre, status */}
          <article>
            <figure className="">
              <img
                src={info.images?.banner}
                alt={info.title}
                className="w-full rounded-t-2xl"
              />
            </figure>

            <aside className="px-5 mt-4">
              <div className="flex gap-1">
                <h2 className="font-semibold">Genre : </h2>
                {info.genres &&
                  Object.values(info.genres).map((genre, index, array) => (
                    <p key={index}>
                      {genre}
                      {index < array.length - 1 && ","}
                    </p>
                  ))}
              </div>

              <div className="flex gap-1">
                <h2>Status : </h2>
                <p>{info.status}</p>
              </div>
            </aside>
          </article>

          {/* Synopsis */}
          <article className="px-5">
            <h2 className="border-b-2 my-5">Synopsis</h2>
            <p>{info.description}</p>
          </article>

          {/* plateforme */}
          <article className=" px-5">
            <h2 className="border-b-2 my-5">Plateforme</h2>
            <figure className=" flex flex-wrap gap-2">
              {info.platforms &&
                info.platforms.svods &&
                info.platforms.svods.map((platform) => (
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    key={platform.id}
                    className={`h-[3em] rounded-md object-cover`}
                  />
                ))}
            </figure>
          </article>
        </div>
      </section>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          liste des saison            */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      <section className="mt-5">
        <h1 className="border-b-2 ">Saisons</h1>
        <article className="flex gap-4 mt-4">
          {info.seasons_details &&
            info.seasons_details.map((season, index) => (
              <figure key={index} className="relative w-[25%] ">
                <img
                  src={info.images?.show}
                  alt={info.title}
                  className="rounded-2xl w-full opacity-50"
                />
                <figcaption className="absolute inset-0 flex justify-center items-center">
                  <p className="text-center text-shadow">
                    Saison {season.number}
                  </p>
                </figcaption>
              </figure>
            ))}
        </article>
      </section>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          liste des acteur            */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      <section className="mt-5">
        <h1 className="border-b-2">Acteurs</h1>
        <article className="flex gap-5 mt-4 scrollBarStyled overflow-y-hidden">
          {info.characters &&
            info.characters.map((actor, index) => (
              <figure key={index} className="p-2 ">
                <div className="w-24 h-24 overflow-hidden rounded-full ">
                  <img
                    src={actor.picture ? actor.picture : picture}
                    alt={actor.actor}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <figcaption className="text-center mt-2">
                  <p>{actor.actor}</p>
                  <p className="text-slate-600">{actor.name}</p>
                </figcaption>
              </figure>
            ))}
        </article>
      </section>
    </main>
  );
}
