package com.project4app.service;

import com.project4app.classes.PasswordUtils;
import com.project4app.model.User;
import com.project4app.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class LoginService {
    private final UserRepository userRepository;

    @Autowired
    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

    public ResponseEntity<String> checkLogin(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            //if(PasswordUtils.verifyPassword(existingUser.get().getPassword(), password)) {
            
            if(existingUser.get().getPassword().equals(password)) {
                String jsonResponse = "{\"status\": \"200\", \"message\": \"Login successful for user " + username + "\"}";
                return ResponseEntity.ok(jsonResponse);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"status\": \"404\", \"message\": \"Wrong password\"}");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"status\": \"404\", \"message\": \"User not found\"}");
    }
}
