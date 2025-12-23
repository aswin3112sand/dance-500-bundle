package com.example.danceplatform.service.impl;

import com.example.danceplatform.config.AppProperties;
import com.example.danceplatform.dto.CreateOrderResponse;
import com.example.danceplatform.dto.PaymentResponse;
import com.example.danceplatform.dto.VerifyPaymentRequest;
import com.example.danceplatform.model.DanceBundle;
import com.example.danceplatform.model.Entitlement;
import com.example.danceplatform.model.EntitlementStatus;
import com.example.danceplatform.model.Payment;
import com.example.danceplatform.model.PaymentStatus;
import com.example.danceplatform.model.User;
import com.example.danceplatform.repository.BundleRepository;
import com.example.danceplatform.repository.EntitlementRepository;
import com.example.danceplatform.repository.PaymentRepository;
import com.example.danceplatform.service.PaymentService;
import com.example.danceplatform.service.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final AppProperties appProperties;
    private final BundleRepository bundleRepository;
    private final PaymentRepository paymentRepository;
    private final EntitlementRepository entitlementRepository;
    private final UserService userService;

    @Override
    public CreateOrderResponse createOrder(User user, Long bundleId) {
        DanceBundle bundle = bundleRepository.findById(bundleId)
                .orElseThrow(() -> new IllegalArgumentException("Bundle not found"));
        if (!bundle.isActive()) {
            throw new IllegalStateException("Bundle is not active");
        }

        RazorpayClient client = razorpayClient();
        long amount = bundle.getPrice() * 100L;
        JSONObject payload = new JSONObject();
        payload.put("amount", amount);
        payload.put("currency", "INR");
        payload.put("receipt", "asdance_" + user.getId() + "_" + Instant.now().toEpochMilli());
        Order order;
        try {
            order = client.orders.create(payload);
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to create Razorpay order");
        }

        String orderId = order.get("id").toString();
        Payment payment = Payment.builder()
                .user(user)
                .razorpayOrderId(orderId)
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .build();
        paymentRepository.save(payment);

        return CreateOrderResponse.builder()
                .orderId(orderId)
                .currency("INR")
                .amount(amount)
                .keyId(appProperties.getRazorpay().getKeyId())
                .bundleName(bundle.getName())
                .build();
    }

    @Override
    public PaymentResponse verifyPayment(User user, VerifyPaymentRequest request) {
        Payment payment = paymentRepository.findByRazorpayOrderId(request.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Payment order not found"));

        String expected = signature(request.getOrderId(), request.getPaymentId());
        if (!expected.equals(request.getSignature())) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            return new PaymentResponse("FAILED", user.isUnlockedBundle());
        }

        payment.setRazorpayPaymentId(request.getPaymentId());
        payment.setSignature(request.getSignature());
        payment.setStatus(PaymentStatus.SUCCESS);
        paymentRepository.save(payment);

        if (request.getBundleId() == null) {
            throw new IllegalArgumentException("Bundle id is required");
        }
        DanceBundle bundle = bundleRepository.findById(request.getBundleId())
                .orElseThrow(() -> new IllegalArgumentException("Bundle not found"));

        entitlementRepository.findByUserIdAndBundleId(user.getId(), bundle.getId())
                .orElseGet(() -> entitlementRepository.save(Entitlement.builder()
                        .userId(user.getId())
                        .bundleId(bundle.getId())
                        .status(EntitlementStatus.ACTIVE)
                        .unlockedAt(java.time.LocalDateTime.now())
                        .build()));

        userService.markBundleUnlocked(user);
        return new PaymentResponse("SUCCESS", true);
    }

    private RazorpayClient razorpayClient() {
        try {
            return new RazorpayClient(appProperties.getRazorpay().getKeyId(), appProperties.getRazorpay().getKeySecret());
        } catch (Exception ex) {
            throw new IllegalStateException("Razorpay client init failed");
        }
    }

    private String signature(String orderId, String paymentId) {
        String data = orderId + "|" + paymentId;
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(appProperties.getRazorpay().getKeySecret().getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] result = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(result);
        } catch (Exception ex) {
            throw new IllegalStateException("Signature generation failed");
        }
    }
}
