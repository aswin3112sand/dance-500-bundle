package com.example.danceplatform.service.impl;

import com.example.danceplatform.model.DanceBundle;
import com.example.danceplatform.repository.BundleRepository;
import com.example.danceplatform.service.BundleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BundleServiceImpl implements BundleService {

    private final BundleRepository bundleRepository;

    @Override
    public DanceBundle getActiveBundle() {
        return bundleRepository.findByActiveTrue()
                .orElseThrow(() -> new IllegalStateException("Active bundle not found"));
    }

    @Override
    public List<DanceBundle> getAllBundles() {
        return bundleRepository.findAll();
    }

    @Override
    public DanceBundle updateBundle(Long id, DanceBundle update) {
        DanceBundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bundle not found"));
        bundle.setName(update.getName());
        bundle.setPrice(update.getPrice());
        bundle.setOriginalPrice(update.getOriginalPrice());
        bundle.setActive(update.isActive());
        return bundleRepository.save(bundle);
    }
}
