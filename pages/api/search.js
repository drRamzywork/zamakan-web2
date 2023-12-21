export default async function handler(req, res) {
  const { query } = req.query;

  try {
    // Fetch data from the first API
    const responsePoets = await fetch(
      `https://api4z.suwa.io/api/Poets/GetAllPoets?searchString=${encodeURIComponent(
        query
      )}&lang=2&pagenum=1&pagesize=50`
    );
    const dataPoets = await responsePoets.json();

    // Fetch data from the second API
    const responsePlaces = await fetch(
      `https://api4z.suwa.io/api/Makan/GetAllPlaces?searchString=${encodeURIComponent(
        query
      )}&lang=2&pagenum=1&pagesize=50`
    );
    const dataPlaces = await responsePlaces.json();

    // Combine the responses with identifiers
    const combinedData = {
      poets: {
        source: "Poets API",
        data: dataPoets,
      },
      places: {
        source: "Places API",
        data: dataPlaces,
      },
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
}
