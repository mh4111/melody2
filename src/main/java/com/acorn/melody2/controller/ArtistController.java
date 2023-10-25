package com.acorn.melody2.controller;


import com.acorn.melody2.entity.GroupArtist;
import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.service.ArtistService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    @Autowired
    private ArtistService artistService;

    private static final Logger logger = LoggerFactory.getLogger(ArtistController.class);

    // Create Solo Artist
    @PostMapping("/solo")
    public SoloArtist createSoloArtist(@RequestBody SoloArtist soloArtist) {
        return artistService.createSoloArtist(soloArtist);
    }

    // Create Group Artist
    @PostMapping("/group")
    public GroupArtist createGroupArtist(@RequestBody GroupArtist groupArtist) {
        return artistService.createGroupArtist(groupArtist);
    }

    // Read Solo Artist by ID
    @GetMapping("/solo/{id}")
    public ResponseEntity<SoloArtist> getSoloArtistById(@PathVariable int id) {
        Optional<SoloArtist> soloArtist = artistService.getSoloArtistById(id);
        return soloArtist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Read Group Artist by ID
    @GetMapping("/group/{id}")
    public ResponseEntity<GroupArtist> getGroupArtistById(@PathVariable int id) {
        Optional<GroupArtist> groupArtist = artistService.getGroupArtistById(id);
        return groupArtist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update Solo Artist
    @PutMapping("/solo/{id}")
    public SoloArtist updateSoloArtist(@PathVariable int id, @RequestBody SoloArtist updatedSoloArtist) {
        return artistService.updateSoloArtist(id, updatedSoloArtist);
    }

    // Update Group Artist
    @PutMapping("/group/{id}")
    public GroupArtist updateGroupArtist(@PathVariable int id, @RequestBody GroupArtist updatedGroupArtist) {
        return artistService.updateGroupArtist(id, updatedGroupArtist);
    }

    @GetMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Object> searchArtists(@RequestParam String name) {
        logger.warn(name);

        // Get group IDs associated with the artist
        List<SoloArtist> soloArtistsResult = artistService.searchSoloArtistsByName(name);
        List<GroupArtist> groupArtistsResult = artistService.searchGroupArtistsByName(name);

        List<Object> results = new ArrayList<>();
        results.addAll(soloArtistsResult);
        results.addAll(groupArtistsResult);

        return results;
    }




    // Delete Solo Artist
    @DeleteMapping("/solo/{id}")
    public void deleteSoloArtist(@PathVariable int id) {
        artistService.deleteSoloArtist(id);
    }

    // Delete Group Artist
    @DeleteMapping("/group/{id}")
    public void deleteGroupArtist(@PathVariable int id) {
        artistService.deleteGroupArtist(id);
    }
}
