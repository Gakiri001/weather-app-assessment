<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        // $lat = $request->query('lat');
        // $lon = $request->query('lon');
        $city = $request->input('city');

        // if (!$lat || !$lon) {
        //     return response()->json(['error' => 'Latitude and longitude are required'], 400);
        // }
        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        $apiKey = config('services.openweather.key');
        $url = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units=metric";

        $response = Http::get($url);

        if ($response->failed()) {
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
        }


        return $response->json();
    }

    public function getForecast(Request $request)
    {
        // $lat = $request->query('lat');
        // $lon = $request->query('lon');
          $city = $request->input('city');

        // if (!$lat || !$lon) {
        //     return response()->json(['error' => 'Latitude and longitude are required'], 400);
        // }
        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        $apiKey = config('services.openweather.key');
        $url = "https://api.openweathermap.org/data/2.5/forecast?q={$city}&appid={$apiKey}&units=metric";

        $response = Http::get($url);

        return $response->json();
    }
}
