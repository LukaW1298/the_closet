package com.project4app.controller;

import com.project4app.model.Outfit;
import com.project4app.service.OutfitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/outfit")
public class OutfitController {
    @Autowired
    private OutfitService outfitService;

    @GetMapping
    public List<Outfit> getAllOutfit() {
        return outfitService.getAllOutfit();
    }

    @GetMapping("/{id}")
    public Optional<Outfit> getOutfitById(@PathVariable(name = "id") int id) {
        return outfitService.getOutfitById(id);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Outfit>  createOutfit(@RequestBody Outfit outfit) {      
        Outfit savedOutfit = outfitService.saveOutfit(outfit);
        return new ResponseEntity<>(savedOutfit, HttpStatus.CREATED);
    } 


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteOutfit(@PathVariable(name = "id") int id) {
        Optional<Outfit> existingOutfitOptional = outfitService.getOutfitById(id);

        if (existingOutfitOptional.isPresent()) {
            Outfit existingOutfit = existingOutfitOptional.get();
            outfitService.deleteOutfit(existingOutfit);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
