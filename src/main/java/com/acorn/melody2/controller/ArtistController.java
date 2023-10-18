//package com.acorn.melody2.controller;
//
//import com.acorn.melody2.entity.GroupArtist;
//import com.acorn.melody2.entity.SoloArtist;
//import com.acorn.melody2.service.SoloArtistService;
//import com.acorn.melody2.service.GroupArtistService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/artist")
//public class ArtistController {
//    private static final Logger logger = LoggerFactory.getLogger(ArtistController.class);
//
//    private final SoloArtistService soloArtistService;
//    private final GroupArtistService groupArtistService;
//
//    @Autowired
//    public ArtistController(SoloArtistService soloArtistService, GroupArtistService groupArtistService) {
//        this.soloArtistService = soloArtistService;
//        this.groupArtistService = groupArtistService;
//    }
//
//    @PostMapping("/solo")
//    public SoloArtist createSoloArtist(@RequestBody SoloArtist soloArtist) {
//        return soloArtistService.saveSoloArtist(soloArtist);
//    }
//
//    @PostMapping("/group")
//    public GroupArtist createGroupArtist(@RequestBody GroupArtist groupArtist) {
//        return groupArtistService.saveGroupArtist(groupArtist);
//    }
//
//    @GetMapping("/solo")
//    public List<SoloArtist> getAllSoloArtists() {
//        logger.warn("test message");
//        return soloArtistService.getAllSoloArtists();
//    }
//
//    @GetMapping("/group")
//    public List<GroupArtist> getAllGroupArtists() {
//        logger.warn("test message");
//        return groupArtistService.getAllGroupArtists();
//    }
//
//    @GetMapping("/solo/{id}")
//    public Optional<SoloArtist> getSoloArtistById(@PathVariable int id) {
//        return soloArtistService.getSoloArtistById(id);
//    }
//
//    @GetMapping("/group/{id}")
//    public Optional<GroupArtist> getGroupArtistById(@PathVariable int id) {
//        return groupArtistService.getGroupArtistById(id);
//    }
//}
