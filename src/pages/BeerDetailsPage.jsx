import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BeerDetailsPage() {
  const [beer, setBeer] = useState(null);
  const { beerId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://ih-beers-api2.herokuapp.com/beers/${beerId}`)
      .then((response) => {
        setBeer(response.data);
      })
      .catch((error) => {
        console.log("Error fetching single beer:", error);
      });
  }, [beerId]);

  if (!beer) {
    return <p>Loading beer details...</p>;
  }

  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <img
        src={beer.image_url}
        alt="Beer"
        height="300px"
        width="auto"
      />
      <h3>{beer.name}</h3>
      <p>{beer.tagline}</p>
      <p>Attenuation level: {beer.attenuation_level}</p>
      <p>Description: {beer.description}</p>
      <p>Created by: {beer.contributed_by}</p>

      <button
        className="btn btn-primary"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

export default BeerDetailsPage;