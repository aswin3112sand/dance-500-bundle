package com.example.danceplatform.controller;

import com.example.danceplatform.model.DanceVideo;
import com.example.danceplatform.service.DanceVideoService;
import com.example.danceplatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final DanceVideoService danceVideoService;

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("videos", danceVideoService.findAll());
        model.addAttribute("videoForm", new DanceVideo());
        model.addAttribute("editing", false);
        return "admin";
    }

    @PostMapping("/videos")
    public String createVideo(@ModelAttribute("videoForm") @Valid DanceVideo video,
                              BindingResult bindingResult,
                              Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("users", userService.findAll());
            model.addAttribute("videos", danceVideoService.findAll());
            model.addAttribute("editing", false);
            return "admin";
        }
        video.setActive(true);
        danceVideoService.save(video);
        return "redirect:/admin/dashboard";
    }

    @PostMapping("/videos/{id}/toggle")
    public String toggleVideo(@PathVariable Long id) {
        danceVideoService.toggleStatus(id);
        return "redirect:/admin/dashboard";
    }

    @PostMapping("/videos/{id}/delete")
    public String deleteVideo(@PathVariable Long id) {
        danceVideoService.delete(id);
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/videos/{id}/edit")
    public String editVideo(@PathVariable Long id, Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("videos", danceVideoService.findAll());
        model.addAttribute("videoForm", danceVideoService.findById(id));
        model.addAttribute("editing", true);
        return "admin";
    }

    @PostMapping("/videos/{id}/update")
    public String updateVideo(@PathVariable Long id,
                              @ModelAttribute("videoForm") DanceVideo video) {
        DanceVideo existing = danceVideoService.findById(id);
        existing.setTitle(video.getTitle());
        existing.setDescription(video.getDescription());
        existing.setThumbnailUrl(video.getThumbnailUrl());
        existing.setVideoUrl(video.getVideoUrl());
        existing.setActive(video.isActive());
        danceVideoService.save(existing);
        return "redirect:/admin/dashboard";
    }
}
