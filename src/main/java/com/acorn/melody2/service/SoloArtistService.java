package com.acorn.melody2.service;

import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.entity.Song;
import com.acorn.melody2.repository.SoloArtistRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoloArtistService {

    private final SoloArtistRepository soloArtistRepository;

    @Autowired
    public SoloArtistService(SoloArtistRepository soloArtistRepository, EntityManager entityManager) {
        this.soloArtistRepository = soloArtistRepository;
    }

    public List<SoloArtist> getAllSoloArtists() {
        return soloArtistRepository.findAll();
    }

    public Optional<SoloArtist> getSoloArtistById(int id) {
        return soloArtistRepository.findById(id);
    }

    public SoloArtist saveSoloArtist(SoloArtist soloArtist) {
        return soloArtistRepository.save(soloArtist);
    }

    public void deleteSoloArtist(int id) {
        soloArtistRepository.deleteById(id);
    }


}
