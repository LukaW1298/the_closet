package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class WashingMode {
    @Id
    private int id;
    private String washing_mode;

    public int getId() {
        return id;
    }

    public String getWashingMode() {
        return washing_mode;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setWashingMode(String washing_mode) {
        this.washing_mode = washing_mode;
    }
}
