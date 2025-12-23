package com.example.danceplatform.controller;

import com.example.danceplatform.dto.BundleResponse;
import com.example.danceplatform.dto.BundleUpdateRequest;
import com.example.danceplatform.dto.PaymentAdminResponse;
import com.example.danceplatform.dto.UploadResponse;
import com.example.danceplatform.dto.UserResponse;
import com.example.danceplatform.dto.VideoRequest;
import com.example.danceplatform.dto.VideoResponse;
import com.example.danceplatform.model.DanceBundle;
import com.example.danceplatform.model.Payment;
import com.example.danceplatform.model.User;
import com.example.danceplatform.model.Video;
import com.example.danceplatform.repository.PaymentRepository;
import com.example.danceplatform.repository.UserRepository;
import com.example.danceplatform.service.BundleService;
import com.example.danceplatform.service.StorageService;
import com.example.danceplatform.service.VideoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final VideoService videoService;
    private final BundleService bundleService;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final StorageService storageService;

    public AdminController(VideoService videoService,
                           BundleService bundleService,
                           UserRepository userRepository,
                           PaymentRepository paymentRepository,
                           StorageService storageService) {
        this.videoService = videoService;
        this.bundleService = bundleService;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
        this.storageService = storageService;
    }

    @GetMapping("/users")
    public List<UserResponse> users() {
        return userRepository.findAll().stream()
                .map(this::toUserResponse)
                .toList();
    }

    @GetMapping("/payments")
    public List<PaymentAdminResponse> payments() {
        return paymentRepository.findAll().stream()
                .map(this::toPaymentResponse)
                .toList();
    }

    @GetMapping("/videos")
    public List<VideoResponse> videos() {
        return videoService.getAllVideos().stream()
                .map(video -> toVideoResponse(video, false))
                .toList();
    }

    @PostMapping("/videos")
    public VideoResponse createVideo(@Valid @RequestBody VideoRequest request) {
        Video video = videoService.createVideo(request);
        return toVideoResponse(video, false);
    }

    @PutMapping("/videos/{id}")
    public VideoResponse updateVideo(@PathVariable Long id, @Valid @RequestBody VideoRequest request) {
        Video video = videoService.updateVideo(id, request);
        return toVideoResponse(video, false);
    }

    @DeleteMapping("/videos/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
    }

    @PostMapping("/upload")
    public UploadResponse upload(@RequestPart("file") MultipartFile file) {
        String url = storageService.save(file);
        return new UploadResponse(url);
    }

    @GetMapping("/bundles")
    public List<BundleResponse> bundles() {
        return bundleService.getAllBundles().stream()
                .map(this::toBundleResponse)
                .toList();
    }

    @PutMapping("/bundles/{id}")
    public BundleResponse updateBundle(@PathVariable Long id, @Valid @RequestBody BundleUpdateRequest request) {
        DanceBundle update = DanceBundle.builder()
                .name(request.getName())
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice())
                .active(Boolean.TRUE.equals(request.getActive()))
                .build();
        DanceBundle saved = bundleService.updateBundle(id, update);
        return toBundleResponse(saved);
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getPhone(), user.getRole().name(), user.isUnlockedBundle());
    }

    private VideoResponse toVideoResponse(Video video, boolean locked) {
        return new VideoResponse(
                video.getId(),
                video.getTitle(),
                video.getLevel().name(),
                video.getDuration(),
                video.getStepsCount(),
                video.getThumbnailUrl(),
                locked ? null : video.getVideoUrl(),
                locked,
                video.isActive()
        );
    }

    private PaymentAdminResponse toPaymentResponse(Payment payment) {
        return new PaymentAdminResponse(
                payment.getId(),
                payment.getUser().getId(),
                payment.getUser().getEmail(),
                payment.getRazorpayOrderId(),
                payment.getRazorpayPaymentId(),
                payment.getAmount(),
                payment.getStatus().name(),
                payment.getCreatedAt()
        );
    }

    private BundleResponse toBundleResponse(DanceBundle bundle) {
        return new BundleResponse(bundle.getId(), bundle.getName(), bundle.getPrice(), bundle.getOriginalPrice(), bundle.isActive());
    }
}
