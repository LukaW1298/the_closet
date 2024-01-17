package com.project4app.service;

import com.project4app.model.Color;
import com.project4app.repository.ColorRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class ColorService {
    private final ColorRepository colorRepository;

    @Autowired
    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    public List<Color> getAllColors() {
        return colorRepository.findAll();
    }

    public Optional<Color> getColorById(@PathVariable Long id) {
        return colorRepository.findById(id);
    }

    public Color createColor(Color color) {
        return colorRepository.save(color);
    }

    public Optional<Color> updateColor(Long id, Color updatedColor) {
        Optional<Color> existingColor = colorRepository.findById(id);
        if (existingColor.isPresent()) {
            Color colorToUpdate = existingColor.get();
            colorToUpdate.setName(updatedColor.getName());

            return Optional.of(colorRepository.save(colorToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
