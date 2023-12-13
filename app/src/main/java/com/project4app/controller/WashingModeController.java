package com.project4app.controller;

import com.project4app.model.WashingMode;
import com.project4app.service.WashingModeService;
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
@RequestMapping("/washingModes")
public class WashingModeController {
    private final WashingModeService washingModeService;

    @Autowired
    public WashingModeController(WashingModeService washingModeService) {
        this.washingModeService = washingModeService;
    }

    @GetMapping
    public List<WashingMode> getAllWashingModes() {
        return washingModeService.getAllWashingModes();
    }

    @GetMapping("/{id}")
    public Optional<WashingMode> getWashingModeById(@PathVariable(name = "id") Long id) {
        return washingModeService.getWashingModeById(id);
    }  

    @PostMapping
    public WashingMode createWashingMode(@RequestBody WashingMode washingMode) {
        return washingModeService.createWashingMode(washingMode);
    }

    @PutMapping("/{id}")
    public Optional<WashingMode> updateWashingMode(@PathVariable(name = "id") Long id, @RequestBody WashingMode updatedWashingMode) {
        return washingModeService.updateWashingMode(id, updatedWashingMode);
    }
}
