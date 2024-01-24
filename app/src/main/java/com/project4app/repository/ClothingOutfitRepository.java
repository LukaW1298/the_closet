package com.project4app.repository;

import com.project4app.model.ClothingOutfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingOutfitRepository extends JpaRepository<ClothingOutfit, Integer> {
    
}
