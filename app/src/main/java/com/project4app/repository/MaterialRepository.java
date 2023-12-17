package com.project4app.repository;

import com.project4app.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long>{
    
}
