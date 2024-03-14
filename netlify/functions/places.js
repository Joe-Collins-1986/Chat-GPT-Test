import fetch from "node-fetch";

async function getPlaceDetails(placeId, apiKey) {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website&key=${apiKey}`;
  const response = await fetch(detailsUrl);
  const data = await response.json();
  return data.result.website; // May be undefined if no website is available
}

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

    const places = await Promise.all(
      data.results.slice(0, 4).map(async (place) => {
        const website = await getPlaceDetails(place.place_id, apiKey);
        return {
          name: place.name,
          link: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
          website, // May be undefined
        };
      })
    );

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
