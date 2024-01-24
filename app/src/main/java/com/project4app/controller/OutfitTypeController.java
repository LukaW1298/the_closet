package com.project4app.controller;

import com.project4app.model.OutfitType;
import com.project4app.service.OutfitTypeService;
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
@RequestMapping("/api/outfitTypes")
public class OutfitTypeController {
    private final OutfitTypeService outfitTypeService;

    @Autowired
    public OutfitTypeController(OutfitTypeService outfitTypeService) {
        this.outfitTypeService = outfitTypeService;
    }

    @GetMapping
    public List<OutfitType> getAllOutfitTypes() {
        return outfitTypeService.getAllOutfitTypes();
    }

    @GetMapping("/{id}")
    public Optional<OutfitType> getOutfitTypeById(@PathVariable(name = "id") Long id) {
        return outfitTypeService.getOutfitTypeById(id);
    }  
    
    @PostMapping
    public OutfitType createOutfitType(@RequestBody OutfitType outfitType) {
        return outfitTypeService.createOutfitType(outfitType);
    }

    @PutMapping("/{id}")
    public Optional<OutfitType> updateOutfitType(@PathVariable(name = "id") Long id, @RequestBody OutfitType updatedOutfitType) {
        return outfitTypeService.updateOutfitType(id, updatedOutfitType);
    }
}
