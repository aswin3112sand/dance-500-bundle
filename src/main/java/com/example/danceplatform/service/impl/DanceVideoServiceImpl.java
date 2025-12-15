package com.example.danceplatform.service.impl;

import com.example.danceplatform.model.DanceVideo;
import com.example.danceplatform.repository.DanceVideoRepository;
import com.example.danceplatform.service.DanceVideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DanceVideoServiceImpl implements DanceVideoService {

    private final DanceVideoRepository danceVideoRepository;

    @Override
    public List<DanceVideo> getActiveVideos() {
        return danceVideoRepository.findTop10ByActiveTrueOrderByCreatedAtDesc();
    }

    @Override
    public List<DanceVideo> findAll() {
        return danceVideoRepository.findAll();
    }

    @Override
    @Transactional
    public DanceVideo save(DanceVideo video) {
        if (video.getId() == null) {
            video.setCreatedAt(LocalDateTime.now());
        }
        return danceVideoRepository.save(video);
    }

    @Override
    public DanceVideo findById(Long id) {
        return danceVideoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Video not found"));
    }

    @Override
    public void delete(Long id) {
        danceVideoRepository.deleteById(id);
    }

    @Override
    @Transactional
    public DanceVideo toggleStatus(Long id) {
        DanceVideo video = findById(id);
        video.setActive(!video.isActive());
        return danceVideoRepository.save(video);
    }
}
