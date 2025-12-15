package com.example.danceplatform.service;

import com.example.danceplatform.dto.RegistrationRequest;
import com.example.danceplatform.model.User;

import java.util.List;

public interface UserService {
    User registerUser(RegistrationRequest request);
    List<User> findAll();
    User findByEmail(String email);
}
