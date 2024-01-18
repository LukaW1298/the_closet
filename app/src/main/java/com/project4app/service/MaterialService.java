package com.project4app.service;

import com.project4app.model.Material;
import com.project4app.repository.MaterialRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    @Autowired
    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    public Optional<Material> getMaterialById(@PathVariable Long id) {
        return materialRepository.findById(id);
    }

    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    public Optional<Material> updateMaterial(Long id, Material updatedMaterial) {
        Optional<Material> existingMaterial = materialRepository.findById(id);
        if (existingMaterial.isPresent()) {
            Material materialToUpdate = existingMaterial.get();
            materialToUpdate.setMaterial(updatedMaterial.getMaterial());

            return Optional.of(materialRepository.save(materialToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
