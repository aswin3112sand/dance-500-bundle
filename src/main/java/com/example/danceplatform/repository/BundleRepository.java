package com.example.danceplatform.repository;

import com.example.danceplatform.model.DanceBundle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BundleRepository extends JpaRepository<DanceBundle, Long> {
    Optional<DanceBundle> findByActiveTrue();
}
