import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY;
const md5 = require("md5");

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isRegisterForme, setIsRegisterForme] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const urlAuth = "https://www.betaseries.com/authorize";
  const urlSignUp = "https://api.betaseries.com/members/signup";

  const submit = (e) => {
    e.preventDefault();

    fetch(`${urlSignUp}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: `key=${API_KEY}&login=${user.name}&password=${md5( user.password )}&email=${user.email}`,
    })
      .then((res) => res.json())
      .then((res) => {
        setErrorMsg(res.errors[0]?.text);
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id_user", res.user.id);
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>page login</h1>

      <a href={`${urlAuth}?client_id=${API_KEY}&redirect_uri=http://localhost:3000/`} >
        Se connecter avec betaseries
      </a>

      <article>
        {!isRegisterForme ? (
          <button
            onClick={() => {
              setIsRegisterForme(!isRegisterForme);
            }}
          >
            s'inscrire
          </button>
        ) : (
          <form>
            <label htmlFor="userlogin">Pseudo</label>
            <input
              type="text"
              name="userlogin"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label htmlFor="email">email</label>
            <input
              type="mail"
              name="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button onClick={submit}>inscription</button>
          </form>
        )}
      </article>
    </div>
  );
}
