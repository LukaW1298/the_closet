package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Occasion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String occasion;

    public int getId() {
        return id;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }
}
