export async function handleSearch(place: string) {
  console.log(`Search button clicked ${place}`);
  try {
    const weatherresponse = await fetch(
      `http://localhost:8000/api/weather?city=${place}`,
    );
    const forecastresponse = await fetch(
      `http://localhost:8000/api/forecast?city=${place}`,
    );
    console.log(`weatherresponse:`, weatherresponse);
    console.log(`forecastresponse:`, forecastresponse);
    if (!weatherresponse.ok || !forecastresponse.ok)
      throw new Error("Failed to fetch data");

    const weatherdata = await weatherresponse.json();
    const forecastdata = await forecastresponse.json();

    return {
      current: {
        temp: weatherdata.temp,
        condition: weatherdata.condition,
        icon: weatherdata.icon,
      },
      forecast: forecastdata.forecast.map((day: any) => ({
        date: day.date,
        temp: day.temp,
        condition: day.condition,
      })),
      wind: `${weatherdata.windSpeed} km/h`,
      humidity: weatherdata.humidity,
    };
  } catch (error) {
    console.log("Error occurred while searching:", error);
  }
}
