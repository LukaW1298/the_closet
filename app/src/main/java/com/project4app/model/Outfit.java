package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Outfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
}
