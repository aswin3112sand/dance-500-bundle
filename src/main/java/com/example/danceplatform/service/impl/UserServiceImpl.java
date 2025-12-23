package com.example.danceplatform.service.impl;

import com.example.danceplatform.dto.RegisterRequest;
import com.example.danceplatform.model.User;
import com.example.danceplatform.model.UserRole;
import com.example.danceplatform.repository.UserRepository;
import com.example.danceplatform.security.UserPrincipal;
import com.example.danceplatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .unlockedBundle(false)
                .build();
        return userRepository.save(user);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            throw new IllegalStateException("User not authenticated");
        }
        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new IllegalStateException("User not found"));
    }

    @Override
    public void markBundleUnlocked(User user) {
        if (!user.isUnlockedBundle()) {
            user.setUnlockedBundle(true);
            userRepository.save(user);
        }
    }
}
