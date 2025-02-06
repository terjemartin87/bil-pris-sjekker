export interface CarData {
  kjennemerke: string;
  merke: string;
  modell: string;
  førsteGangRegistrert: string;
  drivstoff: string;
}

export async function fetchCarData(licensePlate: string): Promise<CarData> {
  try {
    const response = await fetch(`https://vegvesen.no/api/kjøretøy/${licensePlate}`, {
      headers: { "API-Key": "6ca7ee36-fcc0-4f1d-acb5-235d55f75f15" },
    });

    if (!response.ok) {
      throw new Error(`HTTP-feil! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Feil ved henting av bildata:", error);
    throw error;
  }
}