"use client";
import React, { useEffect, useState, useCallback } from "react";
import { CiCloudSun, CiCloudOn } from "react-icons/ci";
import { FaCloudRain } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosArrowDropright } from "react-icons/io";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { handleSearch } from "../search";

const formatDate = (date: Date | string | undefined, options?: Intl.DateTimeFormatOptions) => {
  if (!date) return "N/A";
  const dateOptions: Intl.DateTimeFormatOptions = options || {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, dateOptions);
};

const formatDayMonth = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};



const getWeatherIcon = (iconCode: string | undefined, condition: string | undefined) => {
  if (!iconCode) {
    const lowerCondition = condition?.toLowerCase();
    if (lowerCondition?.includes("Sunny") || lowerCondition?.includes("Clear")) return <IoSunnyOutline className="text-[100px] text-[#FFB800] m-4" />;
    if (lowerCondition?.includes("Rain")) return <FaCloudRain className="text-[100px] text-blue-500 m-4" />;
    if (lowerCondition?.includes("Clouds")) return <CiCloudOn className="text-[100px] text-blue-200 m-4" />;
    return <CiCloudSun className="text-[100px] text-blue-400 m-4" />; 
  }

  if (iconCode.includes("01n")) return <IoSunnyOutline className="text-[100px] text-[#FFB800] m-4" />; // Clear
  if (iconCode.includes("01n") || iconCode.includes("03") || iconCode.includes("04")) return <CiCloudOn className="text-[100px] text-blue-200 m-4" />; // Clouds
  if (iconCode.includes("09") || iconCode.includes("10")) return <FaCloudRain className="text-[100px] text-blue-500 m-4" />; // Rain
  return <CiCloudSun className="text-[100px] text-[#FFB800] m-4" />; // Default
};



interface WeatherData {
  current: {
    temp: number;
    condition: string;
    icon: string;
    city: string;
    date: Date;
  };
  forecast: Array<{
    date: Date;
    minTemp: number;
    maxTemp: number;
    condition: string;
    icon: string;
  }>;
  wind: string;
  humidity: number;
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>("Nairobi");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const convertToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;
  const convertToCelsius = (fahrenheit: number) => ((fahrenheit - 32) * 5) / 9;

  const fetchWeatherData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null); 
    console.log(`Workspaceing data for: ${city}`);
    try {
      const data = await handleSearch(city);
      if (data) {

        data.current.city = city;
        setWeatherData(data);
        setCurrentCity(city);
      } else {
        setError(`Could not fetch weather data for ${city}. Please try another location.`);
      }
    } catch (err) {
      console.error("Error in fetchWeatherData:", err);
      setError("An unexpected error occurred. Please try again.");

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [fetchWeatherData]); 

  const handleCitySearch = () => {
    if (searchInput.trim()) {
      fetchWeatherData(searchInput.trim());
    }
  };

  const displayTemp = (tempC: number) => {
    if (unit === "F") {
      return `${convertToFahrenheit(tempC).toFixed(0)} ºF`;
    }
    return `${tempC} ºC`;
  };

  if (loading && !weatherData) { // Show initial loading screen
    return (
      <div className="flex items-center justify-center h-[90vh] border-1 border-black m-4 rounded-[10px]">
        <p className="text-3xl font-bold">Loading Weather Data...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[90vh] border-1 border-black m-4 rounded-[10px]">
      {/* Left Part - Current Weather */}
      <div className="w-[30%] border-r-1 border-black h-full flex flex-col items-center justify-between p-8">
        {loading && <p className="text-xl">Updating...</p>}
        {!loading && weatherData?.current ? (
          <>
            <div className="flex flex-col items-center justify-center text-center">
              {getWeatherIcon(weatherData.current.icon, weatherData.current.condition)}
              <p className="text-3xl font-bold">
                {displayTemp(weatherData.current.temp)}
              </p>
              <p className="text-3xl font-bold capitalize">
                {weatherData.current.condition}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-bold">
                {formatDate(weatherData.current.date)}
              </p>
              <p className="text-2xl font-bold capitalize">
                {weatherData.current.city}
              </p>
            </div>
          </>
        ) : !loading && error ? (
          <div className="text-center text-red-500">
            <p className="text-xl font-semibold">Error</p>
            <p>{error}</p>
            <p>Displaying default or last known data if available, or try a new search.</p>
          </div>
        ) : !loading && !weatherData ? (
            <div className="text-center">
                <p className="text-xl">No weather data to display for {currentCity}.</p>
                <p>Please try searching for a city.</p>
            </div>
        ) : null }
      </div>

      {/* Right Part - Search, Forecast, Details */}
      <div className="w-[70%] h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b-1 border-gray-200">
          <div className="flex items-center justify-between w-[70%] gap-x-1">
            <Input
              className="border-1 border-gray-300"
              placeholder="Search Area to gets its temperature and forecast" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
            />
            <Button
              className="cursor-pointer"
              onClick={handleCitySearch}
              disabled={loading}
            >
              {loading ? "..." : "Go"}
            </Button>
          </div>
          <div className="w-[30%] gap-x-1 flex justify-end">
            <Button
              className={`cursor-pointer ${unit === "C" ? "bg-blue-500 text-white" : ""}`}
              variant={unit === "C" ? "default" : "ghost"}
              onClick={() => setUnit("C")}
            >
              ºC
            </Button>
            <Button
              variant={unit === "F" ? "default" : "ghost"}
              className={`cursor-pointer ${unit === "F" ? "bg-blue-500 text-white" : "border-2 border-gray-300"}`}
              onClick={() => setUnit("F")}
            >
              ºF
            </Button>
          </div>
        </div>

        {loading && !weatherData && <div className="p-4 text-center"><p>Loading forecast...</p></div>}
        {error && <div className="p-4 text-red-500 text-center"><p>{error}</p></div>}

        {weatherData && !error && (
          <>
            {/* Forecast */}
            <div className="flex items-stretch justify-around p-4 gap-2">
              {weatherData.forecast.length > 0 ? (
                weatherData.forecast.map((day, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 justify-center border-1 border-gray-400 rounded-[10px] w-1/3 h-auto min-h-[200px]" // Ensure consistent height
                  >
                    <p className="font-semibold text-center">{formatDayMonth(day.date)}</p>
                    {getWeatherIcon(day.icon, day.condition)}
                    <p className="text-1xl font-bold text-center">
                      {displayTemp(day.minTemp)} - {displayTemp(day.maxTemp)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No forecast data available.</p>
              )}
            </div>

            {/* Wind and Humidity */}
            <div className="flex items-stretch justify-around p-4 gap-2">
              <div className="flex flex-col items-center p-4 justify-between border-1 border-gray-400 rounded-[10px] w-1/2 min-h-[200px] h-[30vh]">
                <p className="text-1xl font-semibold">Wind Status</p>
                <p className="text-3xl font-bold">{weatherData.wind}</p>
                <IoIosArrowDropright className="text-[60px] text-yellow-300 opacity-50" />
              </div>
              <div className="flex flex-col items-center p-4 justify-between border-1 border-gray-400 rounded-[10px] w-1/2 min-h-[200px] h-[30vh]">
                <p className="text-1xl font-semibold">Humidity Information</p>
                <p className="text-3xl font-bold">{weatherData.humidity}%</p>
                <div className="h-[20px] w-[90%] bg-gray-200 rounded-[10px] mt-auto mb-2">
                  <div
                    className="h-[20px] bg-blue-400 rounded-[10px]"
                    style={{ width: `${weatherData.humidity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}