package com.project4app.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Outfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;

    @OneToOne
    @JoinColumn(name = "ID_user")
    private User user;

    @OneToOne
    @JoinColumn(name = "ID_weather")
    private Weather weather;

    @OneToOne
    @JoinColumn(name = "ID_outfit_type")
    private OutfitType outfitType;

    @OneToMany(mappedBy = "outfit", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnoreProperties("outfit")
    private List<ClothingOutfit> clothingOutfits = new ArrayList<>();

    @OneToMany(mappedBy = "outfit", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnoreProperties("outfit")
    private List<OutfitOccasion> outfitOccasions = new ArrayList<>();

    public int getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public User getUser() {
        return user;
    }

    public Weather getWeather() {
        return weather;
    }

    public OutfitType getOutfitType() {
        return outfitType;
    }

    public List<ClothingOutfit> getClothingOutfits() {
        return clothingOutfits;
    }

    public List<OutfitOccasion> getOutfitOccasions() {
        return outfitOccasions;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setWeather(Weather weather) {
        this.weather = weather;
    }

    public void setOutfitType(OutfitType outfitType) {
        this.outfitType = outfitType;
    }

    public void setClothingOutfits(List<ClothingOutfit> clothingOutfits) {
        this.clothingOutfits = clothingOutfits;
    }

    public void setOutfitOccasions(List<OutfitOccasion> outfitOccasions) {
        this.outfitOccasions = outfitOccasions;
    }
}
