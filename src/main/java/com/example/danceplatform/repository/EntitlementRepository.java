package com.example.danceplatform.repository;

import com.example.danceplatform.model.Entitlement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EntitlementRepository extends JpaRepository<Entitlement, Long> {
    Optional<Entitlement> findByUserIdAndBundleId(Long userId, Long bundleId);
}
