package com.project4app.controller;

import com.project4app.model.Clothing;
import com.project4app.service.ClothingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

    @PostMapping
    @Transactional
    public ResponseEntity<Clothing>  createClothing(@RequestBody Clothing clothing) {      
        Clothing savedClothing = clothingService.saveClothing(clothing);
        return new ResponseEntity<>(savedClothing, HttpStatus.CREATED);
    } 


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteClothing(@PathVariable(name = "id") int id) {
        Optional<Clothing> existingClothingOptional = clothingService.getClothingById(id);

        if (existingClothingOptional.isPresent()) {
            Clothing existingClothing = existingClothingOptional.get();
            clothingService.deleteClothing(existingClothing);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
