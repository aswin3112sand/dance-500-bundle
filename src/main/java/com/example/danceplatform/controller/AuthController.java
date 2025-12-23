package com.example.danceplatform.controller;

import com.example.danceplatform.config.AppProperties;
import com.example.danceplatform.dto.AuthResponse;
import com.example.danceplatform.dto.LoginRequest;
import com.example.danceplatform.dto.RegisterRequest;
import com.example.danceplatform.dto.UserResponse;
import com.example.danceplatform.model.User;
import com.example.danceplatform.repository.UserRepository;
import com.example.danceplatform.security.JwtTokenProvider;
import com.example.danceplatform.security.UserPrincipal;
import com.example.danceplatform.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final UserRepository userRepository;
    private final AppProperties appProperties;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UserService userService,
                          UserRepository userRepository,
                          AppProperties appProperties) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.userRepository = userRepository;
        this.appProperties = appProperties;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.register(request);
        String token = jwtTokenProvider.generateToken(UserPrincipal.from(user));
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, buildCookie(token).toString())
                .body(new AuthResponse("Registered", toUserResponse(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        String token = jwtTokenProvider.generateToken(principal);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, buildCookie(token).toString())
                .body(new AuthResponse("Logged in", toUserResponse(user)));
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout() {
        ResponseCookie cookie = ResponseCookie.from(appProperties.getJwt().getCookieName(), "")
                .httpOnly(true)
                .secure(appProperties.getJwt().isCookieSecure())
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthResponse("Logged out", null));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me() {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(toUserResponse(user));
    }

    private ResponseCookie buildCookie(String token) {
        return ResponseCookie.from(appProperties.getJwt().getCookieName(), token)
                .httpOnly(true)
                .secure(appProperties.getJwt().isCookieSecure())
                .path("/")
                .maxAge(appProperties.getJwt().getExpirationMs() / 1000)
                .sameSite("Lax")
                .build();
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getPhone(), user.getRole().name(), user.isUnlockedBundle());
    }
}
