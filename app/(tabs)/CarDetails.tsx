import { useParams } from "react-router-dom";

function CarDetails() {
  let { kjennemerke } = useParams(); // Henter skiltnummer fra URL

  return (
    <div>
      <h1>Detaljer for bil</h1>
      <p>Kjennemerke: {kjennemerke}</p>
      {/* Her kan du legge til mer info fra API-et */}
    </div>
  );
}

export default CarDetails;