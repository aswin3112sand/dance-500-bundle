package com.example.danceplatform.service;

import com.example.danceplatform.dto.RegisterRequest;
import com.example.danceplatform.model.User;

public interface UserService {
    User register(RegisterRequest request);
    User getCurrentUser();
    void markBundleUnlocked(User user);
}
