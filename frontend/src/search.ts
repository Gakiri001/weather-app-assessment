export async function handleSearch(place: string) {
  console.log(`Search button clicked for ${place}`);
  try {
    const weatherResponse = await fetch(
      `http://localhost:8000/api/weather?city=${place}`,
    );
    const forecastResponse = await fetch(
      `http://localhost:8000/api/forecast?city=${place}`,
    );
    console.log(`weatherResponse:`, weatherResponse);
    console.log(`forecastResponse:`, forecastResponse);

    if (!weatherResponse.ok || !forecastResponse.ok) {
     
      const weatherError = !weatherResponse.ok ? await weatherResponse.text() : null;
      const forecastError = !forecastResponse.ok ? await forecastResponse.text() : null;
      console.error("Failed to fetch data:", { weatherError, forecastError, place });
      throw new Error(`Failed to fetch weather data for ${place}. Server responded with an error.`);
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    console.log("weatherdata", weatherData);
    console.log("forecastdata", forecastData);
    console.log("forecastData.forecast", forecastData.list);


   
    if (!weatherData || !forecastData || !forecastData.list) {
        console.error("Received incomplete data from API for", place);
        throw new Error("Incomplete data received from the weather service.");
    }

    return {
      current: {
        temp: weatherData.main.temp, 
        condition: weatherData.weather.main,
        icon: weatherData.weather.icon, 
        city: place, 
        date: new Date(), 
      },
      forecast: forecastData.list.slice(0, 3).map((day: any) => ({ 
        date: new Date(day.dt_txt),
        minTemp: day.main.temp_min,
        maxTemp: day.main.temp_max, 
        condition: day.condition,
        icon: day.icon,
      })),
      wind: `${weatherData.wind.speed} km/h`,
      humidity: weatherData.main.humidity,
    };
  } catch (error) {
    console.error("Error occurred while searching:", error);
    return null;
  }
}