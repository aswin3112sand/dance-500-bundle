package com.example.danceplatform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BundleUpdateRequest {
    @NotBlank
    private String name;

    @NotNull
    private Integer price;

    @NotNull
    private Integer originalPrice;

    @NotNull
    private Boolean active;
}
