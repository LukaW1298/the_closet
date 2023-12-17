package com.project4app.service;

import com.project4app.model.WashingMode;
import com.project4app.repository.WashingModeRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class WashingModeService {
    private final WashingModeRepository washingModeRepository;

    @Autowired
    public WashingModeService(WashingModeRepository washingModeRepository) {
        this.washingModeRepository = washingModeRepository;
    }

    public List<WashingMode> getAllWashingModes() {
        return washingModeRepository.findAll();
    }

    public Optional<WashingMode> getWashingModeById(@PathVariable Long id) {
        return washingModeRepository.findById(id);
    }

    public WashingMode createWashingMode(WashingMode washingMode) {
        //I have to add a find for find by Name, so we can check if a washingMode with that name already exists
        return washingModeRepository.save(washingMode);
    }

    public Optional<WashingMode> updateWashingMode(Long id, WashingMode updatedWashingMode) {
        Optional<WashingMode> existingWashingMode = washingModeRepository.findById(id);
        if (existingWashingMode.isPresent()) {
            WashingMode washingModeToUpdate = existingWashingMode.get();
            washingModeToUpdate.setWashingMode(updatedWashingMode.getWashingMode());

            return Optional.of(washingModeRepository.save(washingModeToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
