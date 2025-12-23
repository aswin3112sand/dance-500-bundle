package com.example.danceplatform.dto;

import java.time.Instant;

public record PaymentAdminResponse(Long id,
                                   Long userId,
                                   String userEmail,
                                   String razorpayOrderId,
                                   String razorpayPaymentId,
                                   long amount,
                                   String status,
                                   Instant createdAt) {}
