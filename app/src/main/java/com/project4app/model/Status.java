package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String status;

    public int getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }
}
