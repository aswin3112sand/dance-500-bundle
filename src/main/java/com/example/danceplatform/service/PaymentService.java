package com.example.danceplatform.service;

import com.example.danceplatform.dto.CreateOrderResponse;
import com.example.danceplatform.dto.PaymentResponse;
import com.example.danceplatform.dto.VerifyPaymentRequest;
import com.example.danceplatform.model.User;

public interface PaymentService {
    CreateOrderResponse createOrder(User user, Long bundleId);
    PaymentResponse verifyPayment(User user, VerifyPaymentRequest request);
}
