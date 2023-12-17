package com.project4app.service;

import com.project4app.model.User;
import com.project4app.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final UserRepository userRepository;

    @Autowired
    public RegisterService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        //I have to add a find for find by Name, so we can check if a user with that name already exists
        return userRepository.save(user);
    }

    // THIS NEEDS REWORK BRUH
    public Optional<User> updateUser(String username, User updatedUser) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setUsername(updatedUser.getUsername());

            return Optional.of(userRepository.save(userToUpdate));
        } else {
            return Optional.empty();
        }
    }
}