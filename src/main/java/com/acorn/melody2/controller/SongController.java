package com.acorn.melody2.controller;

import com.acorn.melody2.dto.UpdateLikeRequest;
import com.acorn.melody2.entity.GroupArtist;
import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.entity.Song;
import com.acorn.melody2.repository.SongRepository;
import com.acorn.melody2.service.GroupArtistService;
import com.acorn.melody2.service.SoloArtistService;
import com.acorn.melody2.service.SongService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    private static final Logger logger = LoggerFactory.getLogger(SongController.class);

    private final SongService songService;


    private final SongRepository songRepository;

    @Autowired
    public SongController(SongService songService, SongRepository songRepository) {
        this.songService = songService;
        this.songRepository = songRepository;
    }

    // Create a new song
    @PostMapping
    public Song createSong(@RequestBody Song song) {
        return songService.saveSong(song);
    }

    // Read all songs
    @GetMapping
    public List<Song> getAllSongs() {
        logger.warn("test message");
        return songService.getAllSongs();
    }

    // Read a song by ID
    @GetMapping("/{id}")
    public Optional<Song> getSongById(@PathVariable int id) {
        logger.warn("api/song/id called");
        logger.warn(String.valueOf("songId 값"+id));
        return songService.getSongById(id);
    }

    // Search songs by title
    @GetMapping("/search")
    public List<Song> searchSongsByTitle(@RequestParam String title) {
        List<Song> songs = songService.searchSongsByTitle(title);
        logger.warn("Songs found: {}", songs); // Log the list as a string
        return songs;
    }



    // Get the number of likes for an album
    @PostMapping("/likes")
    public ResponseEntity<Song> updateSongLikes(@RequestBody UpdateLikeRequest updateLikeRequest) throws ChangeSetPersister.NotFoundException {
        int songId = updateLikeRequest.getSongId();

        Optional<Song> optionalSong = songService.getSongById(songId);

        if (optionalSong.isPresent()) {
            Song requestedSong = optionalSong.get();
            requestedSong.setLikes(updateLikeRequest.getLikes());
            requestedSong = songService.updateSong(songId, requestedSong);
            return ResponseEntity.ok(requestedSong);
        } else {
            // Handle the case when the song is not found
            return ResponseEntity.notFound().build();
        }
    }

    // Update a song by ID
    @PutMapping("/{id}")
    public Song updateSong(@PathVariable int id, @RequestBody Song updatedSong) {
        return songService.updateSong(id, updatedSong);
    }

    // Delete a song by ID
    @DeleteMapping("/{id}")
    public void deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
    }


}
