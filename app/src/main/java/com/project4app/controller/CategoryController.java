package com.project4app.controller;

import com.project4app.model.Category;
import com.project4app.service.CategoryService;
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
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService CategoryService;

    @Autowired
    public CategoryController(CategoryService CategoryService) {
        this.CategoryService = CategoryService;
    }

    @GetMapping
    public List<Category> getAllCategorys() {
        return CategoryService.getAllCategorys();
    }

    @GetMapping("/{id}")
    public Optional<Category> getCategoryById(@PathVariable(name = "id") Long id) {
        return CategoryService.getCategoryById(id);
    }  
 
    @GetMapping("/getByParent/{ID_parent_category}")
    public List<Category> getCategoryByParentId(@PathVariable(name = "ID_parent_category") Long ID_parent_category) {
        return CategoryService.getCategoryByParentId(ID_parent_category);
    }

    @PostMapping
    public Category createCategory(@RequestBody Category Category) {
        return CategoryService.createCategory(Category);
    }

    @PutMapping("/{id}")
    public Optional<Category> updateCategory(@PathVariable(name = "id") Long id, @RequestBody Category updatedCategory) {
        return CategoryService.updateCategory(id, updatedCategory);
    }
}
