package com.project4app.service;

import com.project4app.model.Image;
import com.project4app.repository.ImageRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Optional<Image> getImageById(@PathVariable Long id) {
        return imageRepository.findById(id);
    }

    public Image createImage(Image image) {
        return imageRepository.save(image);
    }

    public Optional<Image> updateImage(Long id, Image updatedImage) {
        Optional<Image> existingImage = imageRepository.findById(id);
        if (existingImage.isPresent()) {
            Image imageToUpdate = existingImage.get();
            imageToUpdate.setUrl(updatedImage.getUrl());

            return Optional.of(imageRepository.save(imageToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
