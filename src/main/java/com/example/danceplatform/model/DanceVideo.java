package com.example.danceplatform.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "dance_videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanceVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Thumbnail URL is required")
    @Column(name = "thumbnail_url", nullable = false)
    private String thumbnailUrl;

    @NotBlank(message = "Video URL is required")
    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
