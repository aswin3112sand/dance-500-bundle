package com.example.danceplatform.service.impl;

import com.example.danceplatform.config.AppProperties;
import com.example.danceplatform.service.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class StorageServiceImpl implements StorageService {

    private final Path uploadDir;

    public StorageServiceImpl(AppProperties appProperties) {
        this.uploadDir = Path.of(appProperties.getStorage().getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to create upload directory");
        }
    }

    @Override
    public String save(MultipartFile file) {
        String originalName = StringUtils.cleanPath(file.getOriginalFilename());
        String extension = "";
        int dot = originalName.lastIndexOf('.');
        if (dot > 0) {
            extension = originalName.substring(dot);
        }
        String filename = UUID.randomUUID() + extension;
        Path target = uploadDir.resolve(filename);
        try {
            file.transferTo(target);
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to store file");
        }
        return "/uploads/" + filename;
    }
}
