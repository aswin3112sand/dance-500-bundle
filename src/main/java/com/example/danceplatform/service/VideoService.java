package com.example.danceplatform.service;

import com.example.danceplatform.dto.VideoRequest;
import com.example.danceplatform.model.Video;

import java.util.List;

public interface VideoService {
    List<Video> getActiveVideos();
    List<Video> getAllVideos();
    Video createVideo(VideoRequest request);
    Video updateVideo(Long id, VideoRequest request);
    void deleteVideo(Long id);
}
