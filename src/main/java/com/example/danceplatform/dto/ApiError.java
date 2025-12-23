package com.example.danceplatform.dto;

import java.time.Instant;

public record ApiError(String message, Instant timestamp) {}
