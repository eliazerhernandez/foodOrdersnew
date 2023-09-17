import React from "react";
import Card from "./Card";
import Carrusel from "./Carrusel";

function Home() {
  return (
    <div className="p-2">
      <div className="row p-2">
        <Carrusel/>
      </div>
      <div className="row p-2">
        <Card />
      </div>
    </div>
  );
}

export default Home;
