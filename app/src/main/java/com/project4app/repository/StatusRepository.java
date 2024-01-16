package com.project4app.repository;

import com.project4app.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long>{
    
}
