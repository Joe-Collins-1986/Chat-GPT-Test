import fetch from "node-fetch";

export async function handler(event) {
  const { location } = JSON.parse(event.body);
  console.log("TEST");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  console.log("TEST2");
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     location
  //   )}&key=${apiKey}`;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=${apiKey}`;
  console.log("TEST3");

  try {
    const response = await fetch(url);
    console.log("TEST4");
    const data = await response.json();
    console.log("TEST5");
    console.log(data);

    if (data.status === "OK" && data.results.length > 0) {
      console.log("TEST6");
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      console.log("LAT: ", lat);
      console.log("LONG: ", lng);
      return {
        statusCode: 200,
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Location not found" }),
      };
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch geocoding data" }),
    };
  }
}
