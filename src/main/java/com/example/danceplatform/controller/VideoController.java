package com.example.danceplatform.controller;

import com.example.danceplatform.dto.VideoResponse;
import com.example.danceplatform.model.User;
import com.example.danceplatform.model.Video;
import com.example.danceplatform.service.UserService;
import com.example.danceplatform.service.VideoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;
    private final UserService userService;

    public VideoController(VideoService videoService, UserService userService) {
        this.videoService = videoService;
        this.userService = userService;
    }

    @GetMapping
    public List<VideoResponse> listVideos() {
        boolean unlocked = getCurrentUser().map(User::isUnlockedBundle).orElse(false);
        return videoService.getActiveVideos().stream()
                .map(video -> toResponse(video, unlocked))
                .toList();
    }

    private Optional<User> getCurrentUser() {
        try {
            return Optional.of(userService.getCurrentUser());
        } catch (Exception ex) {
            return Optional.empty();
        }
    }

    private VideoResponse toResponse(Video video, boolean unlocked) {
        boolean locked = !unlocked;
        return new VideoResponse(
                video.getId(),
                video.getTitle(),
                video.getLevel().name(),
                video.getDuration(),
                video.getStepsCount(),
                video.getThumbnailUrl(),
                locked ? null : video.getVideoUrl(),
                locked,
                video.isActive()
        );
    }
}
