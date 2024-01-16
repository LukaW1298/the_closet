package com.project4app.service;

import com.project4app.model.Clothing;
import com.project4app.repository.ClothingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClothingService {
    @Autowired
    private ClothingRepository clothingRepository;

    public List<Clothing> getAllClothing() {
        return clothingRepository.findAll();
    }

    public Optional<Clothing> getClothingById(int id) {
        return clothingRepository.findById(id);
    }
}
