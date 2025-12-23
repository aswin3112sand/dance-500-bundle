package com.example.danceplatform.service;

import com.example.danceplatform.model.DanceBundle;

import java.util.List;

public interface BundleService {
    DanceBundle getActiveBundle();
    List<DanceBundle> getAllBundles();
    DanceBundle updateBundle(Long id, DanceBundle update);
}
