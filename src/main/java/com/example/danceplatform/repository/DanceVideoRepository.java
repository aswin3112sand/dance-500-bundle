package com.example.danceplatform.repository;

import com.example.danceplatform.model.DanceVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DanceVideoRepository extends JpaRepository<DanceVideo, Long> {
    List<DanceVideo> findTop10ByActiveTrueOrderByCreatedAtDesc();
}
