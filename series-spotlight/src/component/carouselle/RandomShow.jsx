import React, { useEffect, useState, Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function RandomShow() {
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
    slidesToScroll: 2,

    onSwipe: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
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

  return (
    <section className=" w-[90%]">
      <div className="slider-container">
        <Slider {...settings} className="">
          {randShows.map((show) => (
            <article className="relative  h-[14em] overflow-hidden p-1">
              <img
                src={show.images.poster == null ? poster : show.images.poster}
                alt=""
                className=" h-full object-cover p-2 bg-slate-900 rounded-md"
              />

              {show.images.poster == null ? (
                <div className="absolute inset-0 flex flex-col justify-end px-2 py-2 ">
                  <p className="text-white text-sm text-center bg-slate-900 bg-opacity-80">
                    {show.title}
                  </p>
                </div>
              ) : (
                ""
              )}
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}
