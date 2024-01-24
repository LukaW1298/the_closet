package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class OutfitType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String outfitType;

    public int getId() {
        return id;
    }

    public String getOutfitType() {
        return outfitType;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setOutfitType(String outfitType) {
        this.outfitType = outfitType;
    }
}
