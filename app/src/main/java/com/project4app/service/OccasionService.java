package com.project4app.service;

import com.project4app.model.Occasion;
import com.project4app.repository.OccasionRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class OccasionService {
    private final OccasionRepository occasionRepository;

    @Autowired
    public OccasionService(OccasionRepository occasionRepository) {
        this.occasionRepository = occasionRepository;
    }

    public List<Occasion> getAllOccasions() {
        return occasionRepository.findAll();
    }

    public Optional<Occasion> getOccasionById(@PathVariable Long id) {
        return occasionRepository.findById(id);
    }

    public Occasion createOccasion(Occasion occasion) {
        return occasionRepository.save(occasion);
    }

    public Optional<Occasion> updateOccasion(Long id, Occasion updatedOccasion) {
        Optional<Occasion> existingOccasion = occasionRepository.findById(id);
        if (existingOccasion.isPresent()) {
            Occasion occasionToUpdate = existingOccasion.get();
            occasionToUpdate.setOccasion(updatedOccasion.getOccasion());

            return Optional.of(occasionRepository.save(occasionToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
