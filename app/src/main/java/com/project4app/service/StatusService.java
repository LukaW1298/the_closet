package com.project4app.service;

import com.project4app.model.Status;
import com.project4app.repository.StatusRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class StatusService {
    private final StatusRepository statusRepository;

    @Autowired
    public StatusService(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    public List<Status> getAllStatuss() {
        return statusRepository.findAll();
    }

    public Optional<Status> getStatusById(@PathVariable Long id) {
        return statusRepository.findById(id);
    }
}
