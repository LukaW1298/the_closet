package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Material {
    @Id
    private int id;
    private String material;

    @ManyToMany(mappedBy = "materials")
    private Clothing clothing;

    public int getId() {
        return id;
    }

    public String getMaterial() {
        return material;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Clothing getClothing() {
        return clothing;
    }
}
