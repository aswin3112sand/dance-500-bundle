package com.example.danceplatform.controller;

import com.example.danceplatform.dto.CreateOrderRequest;
import com.example.danceplatform.dto.CreateOrderResponse;
import com.example.danceplatform.dto.PaymentResponse;
import com.example.danceplatform.dto.VerifyPaymentRequest;
import com.example.danceplatform.model.User;
import com.example.danceplatform.service.PaymentService;
import com.example.danceplatform.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService, UserService userService) {
        this.paymentService = paymentService;
        this.userService = userService;
    }

    @PostMapping("/create-order")
    public CreateOrderResponse createOrder(@Valid @RequestBody CreateOrderRequest request) {
        User user = userService.getCurrentUser();
        return paymentService.createOrder(user, request.getBundleId());
    }

    @PostMapping("/verify")
    public PaymentResponse verify(@Valid @RequestBody VerifyPaymentRequest request) {
        User user = userService.getCurrentUser();
        return paymentService.verifyPayment(user, request);
    }
}
