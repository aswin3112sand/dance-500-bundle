package com.example.danceplatform.dto;

public record VideoResponse(Long id,
                             String title,
                             String level,
                             String duration,
                             int stepsCount,
                             String thumbnailUrl,
                             String videoUrl,
                             boolean locked,
                             boolean active) {}
