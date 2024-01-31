package com.project4app.model;

import jakarta.persistence.*;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //private String url;
    private String name;
    private String contentType;

    @Lob
    private byte[] largeBinaryData;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    /*public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }*/

    public byte[] getLargeBinaryData() {
        return largeBinaryData;
    }

    public void setLargeBinaryData(byte[] largeBinaryData) {
        this.largeBinaryData = largeBinaryData;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
