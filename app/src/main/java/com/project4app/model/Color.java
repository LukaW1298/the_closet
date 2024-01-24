package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String hex_code;
    private String name;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getHexCode() {
        return hex_code;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHexCide(String hex_code) {
        this.hex_code = hex_code;
    }
}
