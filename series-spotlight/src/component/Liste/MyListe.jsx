import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function MyListe() {
  const navigate = useNavigate();
  let user = localStorage.getItem("id_user");

  const [shows, setShows] = useState([]);
  const poster =
    "https://rukminim1.flixcart.com/image/416/416/k2p1q4w0/poster/t/v/q/medium-poster-for-room-and-office-motivational-poster-for-walls-original-imafen2z5gejnuzq.jpeg?q=70";

  useEffect(() => {
    const options = { method: "GET", headers: { "X-BetaSeries-Key": API_KEY } };

    fetch(`https://api.betaseries.com/shows/member?id=${user}`, options)
      .then((res) => res.json())
      .then((res) => setShows(res.shows))
     //  .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  const handleShowInfo = (id) => {
    navigate(`/showInfo/${id}`);
  };


  return (
    <main className="">
      <section className="">

        <article className="flex gap-5 my-4 pb-4 scrollBarStyled overflow-y-hidden">
            {shows.map((show) => (
                <figure  className="p-2 hover:cursor-pointer" onClick={() => handleShowInfo(show.id)} >
                  <div className="w-[10em] h-[14em] overflow-hidden">
                    <img
                      src={show.images.poster == null ? poster : show.images.poster}
                      alt=""
                      className="w-full h-full object-cover p-2 bg-slate-700 rounded-md"
                    />
                  </div>
                </figure>
              ))}
          </article>
      </section>
    </main>
  );
}
