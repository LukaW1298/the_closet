package com.project4app.service;

import com.project4app.model.Category;
import com.project4app.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class CategoryService {
    private final CategoryRepository CategoryRepository;

    @Autowired
    public CategoryService(CategoryRepository CategoryRepository) {
        this.CategoryRepository = CategoryRepository;
    }

    public List<Category> getAllCategorys() {
        return CategoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(@PathVariable Long id) {
        return CategoryRepository.findById(id);
    }

    public List<Category> getCategoryByParentId(@PathVariable Long ID_parent_category) {
        return CategoryRepository.findByParentCategory_Id(ID_parent_category);
    }

    public Category createCategory(Category Category) {
        return CategoryRepository.save(Category);
    }

    public Optional<Category> updateCategory(Long id, Category updatedCategory) {
        Optional<Category> existingCategory = CategoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category CategoryToUpdate = existingCategory.get();
            CategoryToUpdate.setType(updatedCategory.getType());

            return Optional.of(CategoryRepository.save(CategoryToUpdate));
        } else {
            return Optional.empty();
        }
    }
}
