import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function RandomShow() {
  const navigate = useNavigate();

  const [randShows, setRandShows] = useState([]);
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

  var settings = {
    className: "slider variable-width",
    variableWidth: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,

    onSwipe: true,
    centerMode: true,
    // autoplay: true,
    autoplaySpeed: 3500,
    // pauseOnHover: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  useEffect(() => {
    console.log(randShows);
  }, [randShows]);

  useEffect(() => {
    const options = { method: "GET", headers: { "X-BetaSeries-Key": API_KEY } };

    fetch("https://api.betaseries.com/shows/random?nb=10", options)
      .then((res) => res.json())
      .then((res) => setRandShows(res.shows))
      .catch((err) => console.error(err));
  }, []);

  const handleShowInfo = (id) => {
    navigate(`/showInfo/${id}`);
  };

  return (
    <main className="w-[90%]">
      <section className="slider-container">
        <Slider {...settings} className="">
          {randShows.map((show) => (
            <article
              key={show.id}
              className="relative h-[14em] overflow-hidden p-1 cursor-pointer"
              onClick={() => handleShowInfo(show.id)}
            >
              <img
                src={show.images.poster == null ? poster : show.images.poster}
                alt=""
                className="w-full h-full object-cover p-2 bg-slate-700 rounded-md"
              />

              {show.images.poster == null ? (
                <div className="absolute inset-0 flex flex-col justify-end px-2 py-2">
                  <p className=" text-sm text-center bg-slate-700 bg-opacity-80">
                    {show.title}
                  </p>
                </div>
              ) : (
                ""
              )}
            </article>
          ))}
        </Slider>
      </section>
    </main>
  );
}
