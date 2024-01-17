package com.project4app.controller;

import com.project4app.model.Clothing;
import com.project4app.service.ClothingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clothing")
public class ClothingController {
    @Autowired
    private ClothingService clothingService;

    @GetMapping
    public List<Clothing> getAllClothing() {
        return clothingService.getAllClothing();
    }

    @GetMapping("/{id}")
    public Optional<Clothing> getClothingById(@PathVariable(name = "id") int id) {
        return clothingService.getClothingById(id);
    }

    
}
