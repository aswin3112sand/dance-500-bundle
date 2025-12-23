package com.example.danceplatform.security;

import com.example.danceplatform.config.AppProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService userDetailsService;
    private final AppProperties appProperties;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider,
                                   CustomUserDetailsService userDetailsService,
                                   AppProperties appProperties) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
        this.appProperties = appProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        if (token != null) {
            if (jwtTokenProvider.validateToken(token)) {
                try {
                    Long userId = jwtTokenProvider.getUserIdFromToken(token);
                    UserPrincipal userDetails = userDetailsService.loadUserById(userId);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } catch (Exception ex) {
                    SecurityContextHolder.clearContext();
                    clearAuthCookie(response);
                }
            } else {
                clearAuthCookie(response);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }

        if (request.getCookies() == null) {
            return null;
        }

        Optional<Cookie> cookie = Arrays.stream(request.getCookies())
                .filter(item -> appProperties.getJwt().getCookieName().equals(item.getName()))
                .findFirst();

        return cookie.map(Cookie::getValue).orElse(null);
    }

    private void clearAuthCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(appProperties.getJwt().getCookieName(), "")
                .httpOnly(true)
                .secure(appProperties.getJwt().isCookieSecure())
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
}
