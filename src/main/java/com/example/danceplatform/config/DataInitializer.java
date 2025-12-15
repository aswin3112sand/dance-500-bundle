package com.example.danceplatform.config;

import com.example.danceplatform.model.DanceVideo;
import com.example.danceplatform.model.User;
import com.example.danceplatform.model.UserRole;
import com.example.danceplatform.repository.DanceVideoRepository;
import com.example.danceplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.stream.IntStream;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedData(UserRepository userRepository,
                               DanceVideoRepository danceVideoRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@dance500.com").isEmpty()) {
                User admin = User.builder()
                        .name("Platform Admin")
                        .email("admin@dance500.com")
                        .password(passwordEncoder.encode("Admin@123"))
                        .role(UserRole.ROLE_ADMIN)
                        .createdAt(LocalDateTime.now())
                        .build();
                userRepository.save(admin);
            }

            if (userRepository.findByEmail("aswin3112").isEmpty()) {
                User demoUser = User.builder()
                        .name("Aswin")
                        .email("aswin3112")
                        .password(passwordEncoder.encode("Aswin3112@"))
                        .role(UserRole.ROLE_USER)
                        .createdAt(LocalDateTime.now())
                        .build();
                userRepository.save(demoUser);
            }

            if (danceVideoRepository.count() == 0) {
                IntStream.rangeClosed(1, 10).forEach(i -> {
                    DanceVideo video = DanceVideo.builder()
                            .title("Groove Pack " + i)
                            .description("High-energy routine #" + i + " to level up your moves.")
                            .thumbnailUrl("https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60")
                            .videoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                            .active(true)
                            .createdAt(LocalDateTime.now().minusDays(10 - i))
                            .build();
                    danceVideoRepository.save(video);
                });
            }
        };
    }
}
