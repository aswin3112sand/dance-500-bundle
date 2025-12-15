package com.example.danceplatform.service;

import com.example.danceplatform.model.DanceVideo;

import java.util.List;

public interface DanceVideoService {
    List<DanceVideo> getActiveVideos();
    List<DanceVideo> findAll();
    DanceVideo save(DanceVideo video);
    DanceVideo findById(Long id);
    void delete(Long id);
    DanceVideo toggleStatus(Long id);
}
