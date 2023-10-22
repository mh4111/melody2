package com.acorn.melody2.service;

import com.acorn.melody2.entity.GroupArtist;
import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.repository.GroupArtistRepository;
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
public class GroupArtistService {

    private final GroupArtistRepository groupArtistRepository;
    private final EntityManager entityManager;
    private static final Logger logger = LoggerFactory.getLogger(SongService.class);

    @Autowired
    public GroupArtistService(GroupArtistRepository groupArtistRepository, EntityManager entityManager) {
        this.groupArtistRepository = groupArtistRepository;
        this.entityManager = entityManager;
    }

    public List<GroupArtist> getAllGroupArtists() {
        return groupArtistRepository.findAll();
    }

    public Optional<GroupArtist> getGroupArtistById(int id) {
        return groupArtistRepository.findById(id);
    }

    public GroupArtist saveGroupArtist(GroupArtist groupArtist) {
        return groupArtistRepository.save(groupArtist);
    }

    public void deleteGroupArtist(int id) {
        groupArtistRepository.deleteById(id);
    }

}
