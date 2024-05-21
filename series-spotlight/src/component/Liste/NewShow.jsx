import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function NewShow() {
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const poster =
    "https://rukminim1.flixcart.com/image/416/416/k2p1q4w0/poster/t/v/q/medium-poster-for-room-and-office-motivational-poster-for-walls-original-imafen2z5gejnuzq.jpeg?q=70";

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#0F172A",
          borderRadius: "50%",
          paddingTop: "1.5px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

//   useEffect(() => {
//     console.log("Shows => ", shows);
//   }, [shows]);

  useEffect(() => {
    const options = { method: "GET", headers: { "X-BetaSeries-Key": API_KEY } };

    fetch("https://api.betaseries.com/news/last", options)
      .then((res) => res.json())
      .then((res) => setShows(res.news))
      .catch((err) => console.error(err));
  }, []);

  const handleShowInfo = (id) => {
    //     navigate(`/showInfo/${id}`);
    console.log("redirige vers page film");
  };

  return (
    <main className="">
      <section className=" mb-10 ">
        <Slider {...settings} className="">
          {shows.map((show) => (
            <article
              key={show.id}
              className="relative h-[30em] overflow-hidden p-1 cursor-pointer"
              onClick={() => handleShowInfo(show.id)}
            >
              <img
                src={show.picture_url}
                alt=""
                className="w-full h-full object-cover p-2 bg-slate-700 rounded-md"
              />

              <div className="absolute inset-0 flex flex-col justify-end px-2 py-2">
                <p className="h-10 text-xl text-center bg-slate-700 bg-opacity-80">
                  {show.title}
                </p>
              </div>
            </article>
          ))}
        </Slider>
      </section>
    </main>
  );
}
