package com.example.danceplatform.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class VerifyPaymentRequest {
    private Long bundleId;

    @JsonAlias({"razorpay_order_id", "razorpayOrderId"})
    private String orderId;

    @JsonAlias({"razorpay_payment_id", "razorpayPaymentId"})
    private String paymentId;

    @JsonAlias({"razorpay_signature", "razorpaySignature"})
    private String signature;
}
