import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function ShowInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [comments, setComments] = useState([]);
  const [similar, setSimilar] = useState([]);

  // const img = [];

  const picture =
    "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg";
  const banner =
    "https://img.freepik.com/vecteurs-premium/banniere-fond-technologie-bleue-moderne_181182-19714.jpg";
  // const poster =
  //   "https://rukminim1.flixcart.com/image/416/416/k2p1q4w0/poster/t/v/q/medium-poster-for-room-and-office-motivational-poster-for-walls-original-imafen2z5gejnuzq.jpeg?q=70";

  const options = {
    method: "GET",
    headers: { "X-BetaSeries-Key": API_KEY },
  };

  useEffect(() => {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //      fetch pour les info de cette serie
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //      fetch pour les commentaire de cette serie
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    fetch(
      `https://api.betaseries.com/comments/comments?type=show&id=${id}&nbpp=20`,
      options
    )
      .then((res) => res.json())
      .then((res) => setComments(res.comments))
      .catch((err) => console.error(err));

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //     fetch pour les titre similaire de cette serie
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // fetch(`https://api.betaseries.com/shows/similars?id=${id}`, options)
    //   .then((res) => res.json())
    //   // .then((res) => setSimilar(res.similars))
    //   .then((res) => {
    //     res.similars.forEach((element) => {
    //       console.log(element);

    //       img.push(
    //       fetch(
    //         `https://api.betaseries.com/pictures/shows?id=${element.id}`,
    //         options
    //       )
    //       .then((images) => (element.picture = images.url))
    //       );
    //     });

    //     Promise.all(img).then(() => {
    //       setSimilar(res.similars)
    //     });
    //   })
    //   .catch((err) => console.error(err));


  }, []);

  useEffect(() => {
    // console.log("info ==> ", info);
    // console.log("comments ==> ", comments);
    // console.log("similar ==> ", similar);
  }, [info, comments]);

  const handleShowInfo = (id) => {
    navigate(`/showInfo/${id}`);
  };

  return (
    <main className="w-[75%] p-6 m-auto">
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*             fiche serie              */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section>
        <h1 className="border-b-2">{info.title}</h1>

        <div className=" rounded-t-2xl mt-4 pb-4 bg-slate-700 bg-opacity-80">
          {/* banner, genre, status */}
          <article>
            {/* <figure className="">
              <img
                src={info.images?.banner}
                alt={info.title}
                className="w-full rounded-t-2xl"
              />
            </figure> */}

            {info.images?.banner || info.images?.show ? (
              <figure className="">
                <img
                  src={
                    info.images?.banner
                      ? info.images?.banner
                      : info.images?.show
                  }
                  alt={info.title}
                  className="w-full rounded-t-2xl"
                />
              </figure>
            ) : (
              <figure className="relative">
                <img
                  src={banner}
                  alt={info.title}
                  className="rounded-t-2xl w-full opacity-50"
                />
                <figcaption className="absolute inset-0 flex justify-center items-center">
                  <p className="text-center text-shadow text-2xl">
                    {info.title}
                  </p>
                </figcaption>
              </figure>
            )}

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
          {info.platforms?.svods.length > 0 && (
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
          )}
        </div>
      </section>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          liste des saison            */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      <section className="mt-8">
        <h1 className="border-b-2">Saisons</h1>
        <article className="flex gap-4 mt-4 scrollBarStyled overflow-y-hidden">
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

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*              liste des Commentaires             */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      {comments.length > 0 && (
        <section className="mt-8">
          <h1 className="border-b-2">Commentaires</h1>
          <div className="flex gap-4 mt-4 pb-5 scrollBarStyled overflow-y-hidden">
            {comments &&
              comments.map((com) => (
                <article className="min-w-56">
                  <p className="h-36 overflow-hidden bg-slate-700 p-2 ">
                    {com.text}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <figure>
                      <img
                        src={com.avatar ? com.avatar : picture}
                        alt={com.login}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </figure>
                    <aside>
                      <p>{com.login}</p>
                    </aside>
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          liste des acteur            */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      {info.characters?.length > 0 && (
        <section className="mt-8">
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
                    <p className="h-12 text-slate-600 overflow-hidden ">
                      {actor.name}
                    </p>
                  </figcaption>
                </figure>
              ))}
          </article>
        </section>
      )}

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/*          titre similaire             */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* <section className=" flex gap-5  mb-4 scrollBarStyled overflow-y-hidden">
        {similar.map((show) => (
          <figure
            className="p-2 hover:cursor-pointer"
            onClick={() => handleShowInfo(show.id)}
          >
            <div className="w-[10em] h-[14em] overflow-hidden">
              <img
                src={
                  similar.images?.poster == null ? poster : show.images.poster
                }
                alt=""
                className="w-full h-full object-cover p-2 bg-slate-700 rounded-md"
              />
            </div>
          </figure>
        ))}
      </section> */}
    </main>
  );
}
