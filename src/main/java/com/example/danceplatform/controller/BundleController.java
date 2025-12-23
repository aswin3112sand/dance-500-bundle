package com.example.danceplatform.controller;

import com.example.danceplatform.dto.BundleResponse;
import com.example.danceplatform.model.DanceBundle;
import com.example.danceplatform.service.BundleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bundles")
public class BundleController {

    private final BundleService bundleService;

    public BundleController(BundleService bundleService) {
        this.bundleService = bundleService;
    }

    @GetMapping("/active")
    public BundleResponse activeBundle() {
        DanceBundle bundle = bundleService.getActiveBundle();
        return new BundleResponse(bundle.getId(), bundle.getName(), bundle.getPrice(), bundle.getOriginalPrice(), bundle.isActive());
    }
}
