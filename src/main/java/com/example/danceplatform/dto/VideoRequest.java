package com.example.danceplatform.dto;

import com.example.danceplatform.model.VideoLevel;
import lombok.Data;

@Data
public class VideoRequest {
    private String title;
    private VideoLevel level;
    private String duration;
    private Integer stepsCount;
    private String thumbnailUrl;
    private String videoUrl;
    private Boolean active;
}
