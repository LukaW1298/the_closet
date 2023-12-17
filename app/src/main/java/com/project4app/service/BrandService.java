package com.project4app.service;

import com.project4app.model.Brand;
import com.project4app.repository.BrandRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class BrandService {
    private final BrandRepository brandRepository;

    @Autowired
    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Optional<Brand> getBrandById(@PathVariable Long id) {
        return brandRepository.findById(id);
    }

    public Brand createBrand(Brand brand) {
        //I have to add a find for find by Name, so we can check if a brand with that name already exists
        return brandRepository.save(brand);
    }

    public Optional<Brand> updateBrand(Long id, Brand updatedBrand) {
        Optional<Brand> existingBrand = brandRepository.findById(id);
        if (existingBrand.isPresent()) {
            Brand brandToUpdate = existingBrand.get();
            brandToUpdate.setName(updatedBrand.getName());

            return Optional.of(brandRepository.save(brandToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
