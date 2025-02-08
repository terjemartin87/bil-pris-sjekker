const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// 🔥 Aktiver CORS for ALLE domener (kan begrenses for sikkerhet)
app.use(cors());

app.get("/api/kjoretoy/:kjennemerke", async (req, res) => {
  const kjennemerke = req.params.kjennemerke;
  const API_URL = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${kjennemerke}`;
  const API_KEY = "6ca7ee36-fcc0-4f1d-acb5-235d55f75f15"; // Bytt ut med din API-nøkkel

  try {
    console.log(`🔎 Henter data for kjennemerke: ${kjennemerke}`);

    const response = await fetch(API_URL, {
      headers: { "SVV-Authorization": `Apikey ${API_KEY}` }, // Korrekt format
    });

    if (!response.ok) {
      console.error(`🚨 Feil! HTTP-status: ${response.status}`);
      return res.status(response.status).json({ error: `Feil fra API: ${response.status}` });
    }

    const data = await response.json();
    console.log("✅ Data mottatt:", data);
    res.json(data);
  } catch (error) {
    console.error("❌ Feil ved henting av data:", error);
    res.status(500).json({ error: "Serverfeil. Kunne ikke hente data." });
  }
});

app.listen(PORT, () => console.log(`🚀 Proxy-server kjører på http://localhost:${PORT}`));