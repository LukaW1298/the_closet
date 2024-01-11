package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Status {
    @Id
    private int id;
    private String status;

    public int getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }
}
