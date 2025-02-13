export type CarData = {
  kjennemerke: string;
  merke: string;
  modell: string;
  førsteGangRegistrert: string;
  drivstoff: string;
  årsmodell: string;
  farge: string;
  vekt: string;
  antallSeter: number;
  effekt: string;
  girkasse: string;
  co2Utslipp: string;
};

// 🚗 Funksjon for å hente detaljer om en bil basert på kjennemerke
export async function fetchCarData(kjennemerke: string): Promise<CarData | null> {
  try {
    const API_URL = `http://localhost:5000/api/kjoretoy/${kjennemerke}`;
    console.log("Sender forespørsel til:", API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error(`HTTP-feil! Status: ${response.status}`);
      return null;
    }

    const rawData = await response.json();
    console.log("Rådata fra API:", rawData);

    const kjoretoyData = rawData.kjoretoydataListe?.[0];
    if (!kjoretoyData) {
      console.error("Fant ingen kjøretøysdata i responsen");
      return null;
    }

    const tekniskeData = kjoretoyData.godkjenning?.tekniskGodkjenning?.tekniskeData;

    const carData: CarData = {
      kjennemerke: kjoretoyData.kjoretoyId?.kjennemerke ?? "Ukjent",
      merke: tekniskeData?.generelt?.merke?.[0]?.merke ?? "Ukjent",
      modell: tekniskeData?.generelt?.handelsbetegnelse?.[0] ?? "Ukjent",
      førsteGangRegistrert: kjoretoyData.registrering?.forstegangsregistreringNorge ?? "Ukjent",
      drivstoff: tekniskeData?.miljodata?.miljoOgdrivstoffGruppe?.[0]?.drivstoffKodeMiljodata?.kodeNavn ?? "Ukjent",
      årsmodell: tekniskeData?.generelt?.arsmodell ? tekniskeData.generelt.arsmodell.toString() : "Ukjent",
      farge: kjoretoyData.registrering?.kjoretoyFarge?.[0]?.farge ?? "Ukjent",
      vekt: tekniskeData?.vekter?.tekniskTillattTotalvekt 
        ? `${tekniskeData.vekter.tekniskTillattTotalvekt} kg` 
        : "Ukjent",
      antallSeter: tekniskeData?.karosseriOgLasteplan?.antallSeter ?? 0,
      effekt: tekniskeData?.motorytelseOgDrivverk?.motor?.[0]?.effekt 
        ? `${tekniskeData.motorytelseOgDrivverk.motor[0].effekt} hk` 
        : "Ukjent",
      girkasse: tekniskeData?.motorytelseOgDrivverk?.girkasse?.girkassetype?.kodeNavn ?? "Ukjent",
      co2Utslipp: tekniskeData?.miljodata?.miljoOgdrivstoffGruppe?.[0]?.co2Utslipp 
        ? `${tekniskeData.miljodata.miljoOgdrivstoffGruppe[0].co2Utslipp} g/km`
        : "Ukjent",
    };

    console.log("Konvertert kjøretøysdata:", carData);
    return carData;
  } catch (error) {
    console.error("Feil ved henting av kjøretøydata:", error);
    return null;
  }
}

// 🚘 Funksjon for å hente en liste over bilmodeller
export async function fetchCarModels(): Promise<string[]> {
  try {
    const API_URL = "http://localhost:5000/api/bilmodeller"; // Endre om nødvendig
    console.log("Henter bilmodeller fra:", API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error(`HTTP-feil! Status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log("Bilmodeller hentet:", data);

    return data?.modeller || []; // Tilpass om nødvendig basert på API-respons
  } catch (error) {
    console.error("Feil ved henting av bilmodeller:", error);
    return [];
  }
}