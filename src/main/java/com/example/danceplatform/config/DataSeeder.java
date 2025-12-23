package com.example.danceplatform.config;

import com.example.danceplatform.model.*;
import com.example.danceplatform.repository.BundleRepository;
import com.example.danceplatform.repository.UserRepository;
import com.example.danceplatform.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private BundleRepository bundleRepository;

        @Autowired
        private VideoRepository videoRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                if (userRepository.count() == 0) {
                        // Seed Admin
                        User admin = User.builder()
                                        .name("Admin")
                                        .email("admin@asdance.com")
                                        .passwordHash(passwordEncoder.encode("admin123"))
                                        .role(UserRole.ADMIN)
                                        .build();
                        userRepository.save(admin);

                        // Seed User
                        User user = User.builder()
                                        .name("User")
                                        .email("user@asdance.com")
                                        .passwordHash(passwordEncoder.encode("User@123"))
                                        .role(UserRole.USER)
                                        .build();
                        userRepository.save(user);

                        // Seed Bundle
                        DanceBundle bundle = DanceBundle.builder()
                                        .name("AS DANCE - 639 Premium Steps Bundle")
                                        .price(499)
                                        .originalPrice(1500)
                                        .active(true)
                                        .build();
                        bundleRepository.save(bundle);

                        // Seed Videos
                        videoRepository.save(Video.builder()
                                        .title("Intro to Tamil Folk")
                                        .level(VideoLevel.EASY)
                                        .duration("10:00")
                                        .stepsCount(10)
                                        .thumbnailUrl("/uploads/sample-thumb.jpg")
                                        .videoUrl("/uploads/sample-video.mp4")
                                        .active(true)
                                        .build());
                        videoRepository.save(Video.builder()
                                        .title("Fast Beats Step 1")
                                        .level(VideoLevel.MEDIUM)
                                        .duration("15:00")
                                        .stepsCount(15)
                                        .thumbnailUrl("/uploads/sample-thumb.jpg")
                                        .videoUrl("/uploads/sample-video.mp4")
                                        .active(true)
                                        .build());
                        videoRepository.save(Video.builder()
                                        .title("Advanced Kovil Dance")
                                        .level(VideoLevel.HARD)
                                        .duration("20:00")
                                        .stepsCount(20)
                                        .thumbnailUrl("/uploads/sample-thumb.jpg")
                                        .videoUrl("/uploads/sample-video.mp4")
                                        .active(true)
                                        .build());
                }
        }
}
