package com.project4app.repository;

import com.project4app.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather, Long>{
    
}
