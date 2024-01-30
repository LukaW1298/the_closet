package com.project4app.repository;

import com.project4app.model.Category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    List<Category> findByParentCategory_Id(Long parentId);
}
