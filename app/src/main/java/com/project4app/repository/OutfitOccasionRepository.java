package com.project4app.repository;

import com.project4app.model.OutfitOccasion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutfitOccasionRepository extends JpaRepository<OutfitOccasion, Integer> {
    
}
