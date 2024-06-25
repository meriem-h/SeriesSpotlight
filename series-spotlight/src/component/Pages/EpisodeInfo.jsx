import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Episode() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [episodes, setEpisodes] = useState({
    season: useParams().season,
    episode: 1,
    index: 0,
  });
  const img = [];

  const options = {
    method: "GET",
    headers: { "X-BetaSeries-Key": "68344755020e" },
  };

  useEffect(() => {
    fetch(
      `https://api.betaseries.com/shows/episodes?id=${id}&season=${episodes.season}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        res.episodes.forEach((element) => {
          img.push(
            fetch(
              `https://api.betaseries.com/pictures/episodes?id=${element.id}`,
              options
            ).then((images) => (element.picture = images.url))
          );
        });
        Promise.all(img).then(() => {
          setInfo(res.episodes);
        });
      })
      .catch((err) => console.error(err));
  }, [episodes.season]);

//   useEffect(() => {
//     console.log("info ==> ", info);
//   }, [info]);

  const test = () => {
    setEpisodes((prevEpisode) => ({
      ...prevEpisode,
      season: 1,
    }));
  };

  const changeEpisode = (e) => {
     console.log(e);
     // setEpisodes((prevEpisode) => ({
     //   ...prevEpisode,
     //   season: 1,
     // }));
   };

  //   useEffect(() => {
  //     console.log("season ", episodes.season);
  //   }, [episodes]);

  return (
    <main>
      <h1 className="border-b-2 ">{info[episodes.index]?.show.title} </h1>
      <section>
        <article>
          <h2 className="border-b-2 ">Episodes</h2>
          {info &&
            info.map((element) => {
               // console.log(element);
              return (
                <div className="bg-slate-700 mb-4 w-[90%] m-auto rounded-l-2xl" onClick={() => changeEpisode(element)} >
                  <figure className="flex gap-4 ">
                    <img src={element.picture} alt="" className="rounded-l-2xl border-2 border-slate-700" />
                    <div>
                      <p className="mt-2 mb-6 italic">{element.title}</p>
                      <figcaption>{element.description}</figcaption>
                    </div>
                  </figure>
                </div>
              );
            })}
        </article>
        {/* <article>
               <figure>
                    <img src="" alt="" />
               </figure>
               <aside></aside>
          </article> */}
      </section>
      {/* <p>{episodes.season}</p> */}
      {/* <button onClick={test}>changer</button> */}
    </main>
  );
}
