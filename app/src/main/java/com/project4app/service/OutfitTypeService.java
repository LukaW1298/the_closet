package com.project4app.service;

import com.project4app.model.OutfitType;
import com.project4app.repository.OutfitTypeRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class OutfitTypeService {
    private final OutfitTypeRepository outfitTypeRepository;

    @Autowired
    public OutfitTypeService(OutfitTypeRepository outfitTypeRepository) {
        this.outfitTypeRepository = outfitTypeRepository;
    }

    public List<OutfitType> getAllOutfitTypes() {
        return outfitTypeRepository.findAll();
    }

    public Optional<OutfitType> getOutfitTypeById(@PathVariable Long id) {
        return outfitTypeRepository.findById(id);
    }

    public OutfitType createOutfitType(OutfitType outfitType) {
        return outfitTypeRepository.save(outfitType);
    }

    public Optional<OutfitType> updateOutfitType(Long id, OutfitType updatedOutfitType) {
        Optional<OutfitType> existingOutfitType = outfitTypeRepository.findById(id);
        if (existingOutfitType.isPresent()) {
            OutfitType outfitTypeToUpdate = existingOutfitType.get();
            outfitTypeToUpdate.setOutfitType(updatedOutfitType.getOutfitType());

            return Optional.of(outfitTypeRepository.save(outfitTypeToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
