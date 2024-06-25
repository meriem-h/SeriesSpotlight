import React from "react";
import Discover from "../Liste/DiscoverShow";
import New from "../Liste/NewShow";
import Popular from "../Liste/PopularShow";
import MyListe from "../Liste/MyListe";

export default function Home() {

  return (
    <main>
      <section className=" m-auto">
        <article className="">
          <h1 className="border-b-2">Nouveaux : </h1>
          <New />
        </article>

        <article className="">
          <h1 className="border-b-2">Ma liste : </h1>
          <MyListe />
        </article>

        <article className="">
          <h1 className="border-b-2">le plus poulaire : </h1>
          <Popular />
        </article>

        <article className="">
          <h1 className="border-b-2">A découvrire : </h1>
          <Discover />
        </article>
        
      </section>
    </main>
  );
}
