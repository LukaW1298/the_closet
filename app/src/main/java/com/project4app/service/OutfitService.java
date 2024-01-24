package com.project4app.service;

import com.project4app.model.ClothingOutfit;
import com.project4app.model.Outfit;
import com.project4app.model.OutfitOccasion;
import com.project4app.repository.OutfitRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OutfitService {
    @Autowired
    private OutfitRepository outfitRepository;

    public List<Outfit> getAllOutfit() {
        return outfitRepository.findAll();
    }

    public Optional<Outfit> getOutfitById(int id) {
        return outfitRepository.findById(id);
    }

    @Transactional
    public Outfit saveOutfit(Outfit outfit) {
        for (ClothingOutfit clothingOutfit : outfit.getClothingOutfits()) {
            clothingOutfit.setOutfit(outfit);
        }

        for (OutfitOccasion outfitOccasion : outfit.getOutfitOccasions()) {
            outfitOccasion.setOutfit(outfit);
        }

        Outfit savedOutfit = outfitRepository.save(outfit);
        return savedOutfit;
    }

    @Transactional
    public void deleteOutfit(Outfit outfit) {
        outfitRepository.delete(outfit);
    }
}
