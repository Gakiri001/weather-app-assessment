<?php

use App\Http\Controllers\Api\WeatherController;

Route::get('/weather', [WeatherController::class, 'getWeather']);
Route::get('/forecast', [WeatherController::class, 'getForecast']);
