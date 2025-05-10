<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');

        if (!$lat || !$lon) {
            return response()->json(['error' => 'Latitude and longitude are required'], 400);
        }

        $apiKey = config('services.openweather.key');
        $url = "https://api.openweathermap.org/data/2.5/weather";

        $response = Http::get($url, [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);

        return $response->json();
    }

    public function getForecast(Request $request)
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');

        if (!$lat || !$lon) {
            return response()->json(['error' => 'Latitude and longitude are required'], 400);
        }

        $apiKey = config('services.openweather.key');
        $url = "https://api.openweathermap.org/data/2.5/forecast";

        $response = Http::get($url, [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);

        return $response->json();
    }
}
