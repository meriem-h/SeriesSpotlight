import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Home() {
  // const navigate = useNavigate();

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  return (
    <div>
      <h1>page home</h1>
      <>
        <Header />
      </>
    </div>
  );
}
