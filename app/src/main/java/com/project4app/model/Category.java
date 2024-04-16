package com.project4app.model;

import jakarta.persistence.*;
import org.springframework.lang.Nullable;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;

    @OneToOne
    @Nullable
    @JoinColumn(name = "id_parent_category", nullable = false)
    private ParentCategory parentCategory;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ParentCategory getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(ParentCategory parentCategory) {
        this.parentCategory = parentCategory;
    }
}
