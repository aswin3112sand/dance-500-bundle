package com.example.danceplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderResponse {
    private String orderId;
    private String currency;
    private Long amount;
    private String keyId;
    private String bundleName;
}
