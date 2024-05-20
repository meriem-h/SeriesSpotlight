import React from 'react';
import "./App.css";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./component/Header"
import Home from "./component/Home"
import Footer from "./component/Footer"
import Login from "./component/Login"
// import ShowInfo from "./component/ShowInfo";
import ShowInfo from "./component/ShowInfoBis";

const API_KEY = process.env.REACT_APP_API_KEY
const API_SECRET_KEY = process.env.REACT_APP_SECRET_API_KEY
const urlAccessToken = "https://api.betaseries.com/members/access_token"

export default function App() {

  const [connected, setConnected] = useState(false);
  const [homePage, setHomePage] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (code) {
      fetch(`${urlAccessToken}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `client_id=${API_KEY}&client_secret=${API_SECRET_KEY}&redirect_uri=http://localhost:3000/&code=${code}`
      })
        .then(res => res.json())
        .then(res => {
          if (res.token !== undefined) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('id_user', res.user.id);
            setConnected(true);
          }
        })
        .catch(err => console.error(err))
    }

    if (token && token !== "undefined") {
      fetch(`https://api.betaseries.com/members/is_active?key=${API_KEY}&token=${token}`, {
        method: 'GET',
        headers: new Headers(),
      })
        .then((res) => {
          if (res.status == 200) {
            setConnected(true);
          } else {
            setConnected(false);
            localStorage.removeItem('token');
          }
        })
        .catch(err => console.error(err))
    }
  }, [])

  useEffect(() => {
    setHomePage(connected ? <Home /> : <Login />);
  }, [connected]);

  return (

    <div className="App min-h-screen text-white bg-slate-900">
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={homePage} />
          <Route path="/showInfo/:id" element={<ShowInfo />} />
        </Routes>
        <Footer />
      </Router>
    </div>

  );
}