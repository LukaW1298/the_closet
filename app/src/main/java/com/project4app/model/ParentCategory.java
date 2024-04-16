package com.project4app.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ParentCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "id_parent_category")
    private List<Category> categories = new ArrayList<Category>();

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }
}
