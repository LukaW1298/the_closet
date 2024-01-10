package com.project4app.service;

import com.project4app.model.ParentCategory;
import com.project4app.repository.ParentCategoryRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class ParentCategoryService {
    private final ParentCategoryRepository parentCategoryRepository;

    @Autowired
    public ParentCategoryService(ParentCategoryRepository parentCategoryRepository) {
        this.parentCategoryRepository = parentCategoryRepository;
    }

    public List<ParentCategory> getAllParentCategorys() {
        return parentCategoryRepository.findAll();
    }

    public Optional<ParentCategory> getParentCategoryById(@PathVariable Long id) {
        return parentCategoryRepository.findById(id);
    }

    public ParentCategory createParentCategory(ParentCategory parentCategory) {
        return parentCategoryRepository.save(parentCategory);
    }

    public Optional<ParentCategory> updateParentCategory(Long id, ParentCategory updatedParentCategory) {
        Optional<ParentCategory> existingParentCategory = parentCategoryRepository.findById(id);
        if (existingParentCategory.isPresent()) {
            ParentCategory parentCategoryToUpdate = existingParentCategory.get();
            parentCategoryToUpdate.setType(updatedParentCategory.getType());

            return Optional.of(parentCategoryRepository.save(parentCategoryToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
