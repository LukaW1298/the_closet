package com.project4app.controller;

import com.project4app.model.Weather;
import com.project4app.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/weathers")
public class WeatherController {
    private final WeatherService weatherService;

    @Autowired
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public List<Weather> getAllWeathers() {
        return weatherService.getAllWeathers();
    }

    @GetMapping("/{id}")
    public Optional<Weather> getWeatherById(@PathVariable(name = "id") Long id) {
        return weatherService.getWeatherById(id);
    }  
    
    @PostMapping
    public Weather createWeather(@RequestBody Weather weather) {
        return weatherService.createWeather(weather);
    }

    @PutMapping("/{id}")
    public Optional<Weather> updateWeather(@PathVariable(name = "id") Long id, @RequestBody Weather updatedWeather) {
        return weatherService.updateWeather(id, updatedWeather);
    }
}
