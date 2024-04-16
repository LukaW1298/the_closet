package com.project4app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class ClothingOutfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_outfit")
    @JsonIgnoreProperties("clothingOutfits") 
    private Outfit outfit;

    @ManyToOne
    @JoinColumn(name = "id_clothing")
    private Clothing clothing;

    public Outfit getOutfit() {
        return outfit;
    }

    public void setOutfit(Outfit outfit) {
        this.outfit = outfit;
    }

    public Clothing getClothing() {
        return clothing;
    }

    public void setClothing(Clothing clothing) {
        this.clothing = clothing;
    }
}
