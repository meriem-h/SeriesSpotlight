import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("id_user");

    fetch(`https://api.betaseries.com/members/destroy`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: `token=${token}`,
    })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleHome = () => {
    navigate(`/`);
  };

  return (
    <section className="flex justify-between pt-8 mb-14">
      <aside onClick={handleHome} className="flex items-center justify-center p-4 border-2 rounded-tl-[50%] rounded-tr-[20%] rounded-bl-[10%] rounded-br-[40%] hover:cursor-pointer hover:text-xl transition-all duration-200">
        <h1 className="text-center text">Serie Spotlight</h1>
      </aside>
      <aside className="flex flex-col items-center">
        <figure>
          <img
            src="https://www.cuisine-essentiel.fr/images/2020/10/avatar-neutre.png"
            alt="profile"
            className="h-10 w-10 rounded-2xl border-2 border-sky-50 bg-slate-500"
          />
        </figure>
        <button onClick={handleLogOut}>déconnection</button>
      </aside>
    </section>
  );
}
