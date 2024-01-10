package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Category {
    @Id
    private int id;
    private String type;
    private int ID_parent_category;

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public int getParentID() {
        return ID_parent_category;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setParentID(int id) {
        this.ID_parent_category = id;
    }
}
