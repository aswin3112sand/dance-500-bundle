package com.example.danceplatform.service.impl;

import com.example.danceplatform.dto.VideoRequest;
import com.example.danceplatform.model.Video;
import com.example.danceplatform.model.VideoLevel;
import com.example.danceplatform.repository.VideoRepository;
import com.example.danceplatform.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;

    @Override
    public List<Video> getActiveVideos() {
        return videoRepository.findByActiveTrueOrderByCreatedAtDesc();
    }

    @Override
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @Override
    public Video createVideo(VideoRequest request) {
        Video video = Video.builder()
                .title(request.getTitle())
                .level(resolveLevel(request.getLevel()))
                .duration(request.getDuration())
                .stepsCount(request.getStepsCount() == null ? 0 : request.getStepsCount())
                .thumbnailUrl(safeString(request.getThumbnailUrl()))
                .videoUrl(safeString(request.getVideoUrl()))
                .active(Boolean.TRUE.equals(request.getActive()))
                .build();
        return videoRepository.save(video);
    }

    @Override
    public Video updateVideo(Long id, VideoRequest request) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Video not found"));
        if (request.getTitle() != null) {
            video.setTitle(request.getTitle());
        }
        if (request.getLevel() != null) {
            video.setLevel(resolveLevel(request.getLevel()));
        }
        if (request.getDuration() != null) {
            video.setDuration(request.getDuration());
        }
        if (request.getStepsCount() != null) {
            video.setStepsCount(request.getStepsCount());
        }
        if (request.getThumbnailUrl() != null) {
            video.setThumbnailUrl(request.getThumbnailUrl());
        }
        if (request.getVideoUrl() != null) {
            video.setVideoUrl(request.getVideoUrl());
        }
        if (request.getActive() != null) {
            video.setActive(request.getActive());
        }
        return videoRepository.save(video);
    }

    @Override
    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }

    private VideoLevel resolveLevel(VideoLevel level) {
        return level == null ? VideoLevel.EASY : level;
    }

    private String safeString(String value) {
        return value == null ? "" : value;
    }
}
