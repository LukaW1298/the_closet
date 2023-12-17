package com.project4app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project4app.model.User;
import com.project4app.service.RegisterService;

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    private final RegisterService registerService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return registerService.createUser(user);
    }

    @PutMapping("/{username}")
    public Optional<User> updateUser(@PathVariable(name = "username") String username, @RequestBody User updatedUser) {
        return registerService.updateUser(username, updatedUser);
    }
}
