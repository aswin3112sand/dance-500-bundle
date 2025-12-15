package com.example.danceplatform.controller;

import com.example.danceplatform.model.DanceVideo;
import com.example.danceplatform.service.DanceVideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final DanceVideoService danceVideoService;

    @GetMapping("/")
    public String landingRedirect(Authentication authentication) {
        return authentication != null ? "redirect:/home" : "redirect:/login";
    }

    @GetMapping("/home")
    public String home(Model model) {
        List<DanceVideo> videos = danceVideoService.getActiveVideos();
        model.addAttribute("videos", videos);
        return "home";
    }
}
