package com.project4app.controller;

import com.project4app.model.Image;
import com.project4app.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /*@GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/{id}")
    public Optional<Image> getImageById(@PathVariable(name = "id") Long id) {
        return imageService.getImageById(id);
    }*/ 

    @PostMapping("/upload")
    public ResponseEntity<String> handleImageUpload(@RequestParam("file") MultipartFile file) {
        try {
            String name = file.getOriginalFilename();
            String contentType = file.getContentType();
            byte[] data = file.getBytes();

            Image savedImage = imageService.saveImage(name, contentType, data);

            return ResponseEntity.ok("Image uploaded successfully with ID: " + savedImage.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> handleImageDownload(@PathVariable Long id) {
        Optional<Image> image = imageService.getImageById(id);

        return image.map(entity ->
                ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + entity.getName() + "\"")
                        .body(entity.getLargeBinaryData())
        ).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    /*@PostMapping
    public Image createImage(@RequestBody Image image) {
        return imageService.createImage(image);
    }*/

    /*@PutMapping("/{id}")
    public Optional<Image> updateImage(@PathVariable(name = "id") Long id, @RequestBody Image updatedImage) {
        return imageService.updateImage(id, updatedImage);
    }*/
}
