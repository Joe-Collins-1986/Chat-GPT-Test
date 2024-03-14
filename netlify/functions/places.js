// netlify/functions/places.js
import fetch from "node-fetch";

export async function handler(event) {
  const { keyword, latitude, longitude } = JSON.parse(event.body);
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const radius = 16093.4; // 10 miles in meters
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${encodeURIComponent(
    keyword
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const places = data.results.slice(0, 4).map((place) => ({
      name: place.name,
      link: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(places),
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch places" }),
    };
  }
}
