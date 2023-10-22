package com.acorn.melody2.controller;

import com.acorn.melody2.entity.GroupArtist;
import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.service.SoloArtistService;
import com.acorn.melody2.service.GroupArtistService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/artist")
public class ArtistController {
    private static final Logger logger = LoggerFactory.getLogger(ArtistController.class);

    private final SoloArtistService soloArtistService;
    private final GroupArtistService groupArtistService;

    @Autowired
    public ArtistController(SoloArtistService soloArtistService, GroupArtistService groupArtistService) {
        this.soloArtistService = soloArtistService;
        this.groupArtistService = groupArtistService;
    }

    @PostMapping("/{artistType}")
    public Object createArtist(@PathVariable String artistType, @RequestBody Object artist) {
        if ("solo".equals(artistType)) {
            return soloArtistService.saveSoloArtist((SoloArtist) artist);
        } else if ("group".equals(artistType)) {
            return groupArtistService.saveGroupArtist((GroupArtist) artist);
        } else {
            // Handle invalid artistType or return an appropriate response
            return ResponseEntity.badRequest().body("Invalid artist type.");
        }
    }

    @GetMapping("/{artistType}")
    public List<?> getAllArtists(@PathVariable String artistType) {
        if ("solo".equals(artistType)) {
            return soloArtistService.getAllSoloArtists();
        } else if ("group".equals(artistType)) {
            return groupArtistService.getAllGroupArtists();
        } else {
            // Handle invalid artistType or return an appropriate response
            return Collections.singletonList(ResponseEntity.badRequest().body("Invalid artist type."));
        }
    }

    @GetMapping("/{artistType}/{id}")
    public Optional<?> getArtistById(@PathVariable String artistType, @PathVariable int id) {
        if ("solo".equals(artistType)) {
            return soloArtistService.getSoloArtistById(id);
        } else if ("group".equals(artistType)) {
            return groupArtistService.getGroupArtistById(id);
        } else {
            // Handle invalid artistType or return an appropriate response
            return Optional.of(ResponseEntity.badRequest().body("Invalid artist type."));
        }
    }
}
