package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class ParentCategory {
    @Id
    private int id;
    private String type;

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
