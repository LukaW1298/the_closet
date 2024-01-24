package com.project4app.service;

import com.project4app.model.Weather;
import com.project4app.repository.WeatherRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class WeatherService {
    private final WeatherRepository weatherRepository;

    @Autowired
    public WeatherService(WeatherRepository weatherRepository) {
        this.weatherRepository = weatherRepository;
    }

    public List<Weather> getAllWeathers() {
        return weatherRepository.findAll();
    }

    public Optional<Weather> getWeatherById(@PathVariable Long id) {
        return weatherRepository.findById(id);
    }

    public Weather createWeather(Weather weather) {
        return weatherRepository.save(weather);
    }

    public Optional<Weather> updateWeather(Long id, Weather updatedWeather) {
        Optional<Weather> existingWeather = weatherRepository.findById(id);
        if (existingWeather.isPresent()) {
            Weather weatherToUpdate = existingWeather.get();
            weatherToUpdate.setWeather(updatedWeather.getWeather());

            return Optional.of(weatherRepository.save(weatherToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
