


 import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
     let token = localStorage.getItem('token');

     fetch(`https://api.betaseries.com/members/destroy`, {
         method: "POST",
         headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded',
         }),
         body: `token=${token}`,
     })
     .then(() => {
         localStorage.removeItem('token');
         navigate("/")
         window.location.reload();
     })
     .catch(err => console.error(err))
 }

  return (
    <div>
      <button onClick={handleClick}>déconnection</button>
      
    </div>
  );
}