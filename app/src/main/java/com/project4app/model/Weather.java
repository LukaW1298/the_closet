package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String weather;

    public int getId() {
        return id;
    }

    public String getWeather() {
        return weather;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }
}
