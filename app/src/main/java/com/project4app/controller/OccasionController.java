package com.project4app.controller;

import com.project4app.model.Occasion;
import com.project4app.service.OccasionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/occasions")
public class OccasionController {
    private final OccasionService occasionService;

    @Autowired
    public OccasionController(OccasionService occasionService) {
        this.occasionService = occasionService;
    }

    @GetMapping
    public List<Occasion> getAllOccasions() {
        return occasionService.getAllOccasions();
    }

    @GetMapping("/{id}")
    public Optional<Occasion> getOccasionById(@PathVariable(name = "id") Long id) {
        return occasionService.getOccasionById(id);
    }  
    
    @PostMapping
    public Occasion createOccasion(@RequestBody Occasion occasion) {
        return occasionService.createOccasion(occasion);
    }

    @PutMapping("/{id}")
    public Optional<Occasion> updateOccasion(@PathVariable(name = "id") Long id, @RequestBody Occasion updatedOccasion) {
        return occasionService.updateOccasion(id, updatedOccasion);
    }
}
