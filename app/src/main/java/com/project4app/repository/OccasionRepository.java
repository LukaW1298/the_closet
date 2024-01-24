package com.project4app.repository;

import com.project4app.model.Occasion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OccasionRepository extends JpaRepository<Occasion, Long>{
    
}
