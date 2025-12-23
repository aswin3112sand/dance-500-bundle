package com.example.danceplatform.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "entitlements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Entitlement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long bundleId;

    @Enumerated(EnumType.STRING)
    private EntitlementStatus status;

    @CreationTimestamp
    private LocalDateTime unlockedAt;
}
