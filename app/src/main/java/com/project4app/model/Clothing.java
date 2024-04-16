package com.project4app.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "clothing_item")
public class Clothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private float price;
    private String notes;
    private String size;

    @OneToOne
    @JoinColumn(name = "ID_color")
    private Color color;

    @OneToOne
    @JoinColumn(name = "ID_brand")
    private Brand brand;

    @OneToOne
    @JoinColumn(name = "ID_category")
    private Category category;

    @OneToOne
    @JoinColumn(name = "ID_status")
    private Status status;

    @OneToOne
    @JoinColumn(name = "ID_washing_mode")
    private WashingMode washingMode;

    @OneToOne
    @JoinColumn(name = "ID_user")
    private User user;

    @OneToOne
    @JoinColumn(name = "ID_image")
    private Image image;

    @OneToMany(mappedBy = "clothing", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnoreProperties("clothing") 
    private List<ClothingMaterial> clothingMaterials = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public WashingMode getWashingMode() {
        return washingMode;
    }

    public void setWashingMode(WashingMode washingMode) {
        this.washingMode = washingMode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public List<ClothingMaterial> getClothingMaterials() {
        return clothingMaterials;
    }

    public void setClothingMaterials(List<ClothingMaterial> clothingMaterials) {
        this.clothingMaterials = clothingMaterials;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
