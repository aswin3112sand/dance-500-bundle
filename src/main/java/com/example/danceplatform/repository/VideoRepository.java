package com.example.danceplatform.repository;

import com.example.danceplatform.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByActiveTrueOrderByCreatedAtDesc();
}
