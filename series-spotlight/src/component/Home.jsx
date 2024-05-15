import React from "react";
import Header from "./Header";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Home() {
  const [newShow, setNewShow] = useState({});

  useEffect(() => {
    console.log(newShow);
  }, [newShow]);

  useEffect(() => {
    const options = { method: "GET", headers: { "X-BetaSeries-Key": API_KEY } };

    fetch("https://api.betaseries.com/shows/random?nb=20", options)
      .then((res) => res.json())
      .then((res) => setNewShow(res.shows))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>page home</h1>
      <>
        <Header />
      </>
    </div>
  );
}
