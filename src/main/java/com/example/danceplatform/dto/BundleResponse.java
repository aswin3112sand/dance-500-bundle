package com.example.danceplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BundleResponse {
    private Long id;
    private String name;
    private int price;
    private int originalPrice;
    private boolean active;
}
