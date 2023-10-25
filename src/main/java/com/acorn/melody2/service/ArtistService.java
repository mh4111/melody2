package com.acorn.melody2.service;

import com.acorn.melody2.entity.ArtistAliases;
import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.entity.GroupArtist;
import com.acorn.melody2.exception.ArtistNotFoundException;
import com.acorn.melody2.repository.SoloArtistRepository;
import com.acorn.melody2.repository.GroupArtistRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ArtistService {

    private final SoloArtistRepository soloArtistRepository;
    private final GroupArtistRepository groupArtistRepository;
    private final EntityManager entityManager;
    private static final Logger logger = LoggerFactory.getLogger(ArtistService.class);

    @Autowired
    public ArtistService(SoloArtistRepository soloArtistRepository, GroupArtistRepository groupArtistRepository, EntityManager entityManager) {
        this.soloArtistRepository = soloArtistRepository;
        this.groupArtistRepository = groupArtistRepository;
        this.entityManager = entityManager;
    }

    // Create Solo Artist
    public SoloArtist createSoloArtist(SoloArtist soloArtist) {
        return soloArtistRepository.save(soloArtist);
    }

    // Create Group Artist
    public GroupArtist createGroupArtist(GroupArtist groupArtist) {
        return groupArtistRepository.save(groupArtist);
    }

    // Read Solo Artist by ID
    public Optional<SoloArtist> getSoloArtistById(int id) {
        return soloArtistRepository.findById(id);
    }

    // Read Group Artist by ID
    public Optional<GroupArtist> getGroupArtistById(int id) {
        return groupArtistRepository.findById(id);
    }

    // Update Solo Artist
    public SoloArtist updateSoloArtist(int id, SoloArtist updatedSoloArtist) {
        Optional<SoloArtist> existingSoloArtistOptional = soloArtistRepository.findById(id);
        if (existingSoloArtistOptional.isPresent()) {
            SoloArtist existingSoloArtist = existingSoloArtistOptional.get();
            // Update fields with the new data
            existingSoloArtist.setSingerName(updatedSoloArtist.getSingerName());
            existingSoloArtist.setSingerPhoto(updatedSoloArtist.getSingerPhoto());
            existingSoloArtist.setSingerInfo(updatedSoloArtist.getSingerInfo());
            existingSoloArtist.setSingerHashtags(updatedSoloArtist.getSingerHashtags());
            // ... other fields

            return soloArtistRepository.save(existingSoloArtist);
        } else {
            throw new ArtistNotFoundException("Solo artist with ID " + id + " not found");
        }
    }

    // Update Group Artist
    public GroupArtist updateGroupArtist(int id, GroupArtist updatedGroupArtist) {
        Optional<GroupArtist> existingGroupArtistOptional = groupArtistRepository.findById(id);
        if (existingGroupArtistOptional.isPresent()) {
            GroupArtist existingGroupArtist = existingGroupArtistOptional.get();
            // Update fields with the new data
            existingGroupArtist.setGroupName(updatedGroupArtist.getGroupName());
            existingGroupArtist.setGroupPhoto(updatedGroupArtist.getGroupPhoto());
            existingGroupArtist.setGroupInfo(updatedGroupArtist.getGroupInfo());
            existingGroupArtist.setGroupHashtags(updatedGroupArtist.getGroupHashtags());
            // ... other fields

            return groupArtistRepository.save(existingGroupArtist);
        } else {
            throw new ArtistNotFoundException("Group artist with ID " + id + " not found");
        }
    }


    //aliases 추가 서치 
    public List<SoloArtist> searchSoloArtistsByName(String name) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<SoloArtist> criteriaQuery = criteriaBuilder.createQuery(SoloArtist.class);
        Root<SoloArtist> soloArtistRoot = criteriaQuery.from(SoloArtist.class);

        Predicate namePredicate = criteriaBuilder.like(
                criteriaBuilder.lower(soloArtistRoot.get("singerName")),
                "%" + name.toLowerCase() + "%"
        );

        criteriaQuery.where(namePredicate);

        TypedQuery<SoloArtist> query = entityManager.createQuery(criteriaQuery);
        return query.getResultList();
    }



    public List<GroupArtist> searchGroupArtistsByName(String name) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Integer> criteriaQuery = criteriaBuilder.createQuery(Integer.class);
        Root<SoloArtist> soloArtistRoot = criteriaQuery.from(SoloArtist.class);

        // Join the SoloArtist with ArtistAliases based on a condition
        Join<SoloArtist, ArtistAliases> soloAliasJoin = soloArtistRoot.join("artistAliases", JoinType.LEFT);
        soloAliasJoin.on(
                criteriaBuilder.equal(
                        soloArtistRoot.get("singerName"),
                        soloAliasJoin.get("aliasName")
                )
        );

        criteriaQuery.select(soloAliasJoin.get("groupArtist").get("groupArtistId").as(Integer.class));

        Predicate namePredicate = criteriaBuilder.like(
                criteriaBuilder.lower(soloAliasJoin.get("aliasName")),
                "%" + name.toLowerCase() + "%"
        );

        criteriaQuery.where(namePredicate).distinct(true);

        TypedQuery<Integer> query = entityManager.createQuery(criteriaQuery);
        List<Integer> groupIds = query.getResultList();

        // Search for group artists using a loop
        List<GroupArtist> groupArtists = new ArrayList<>();
        for (Integer groupId : groupIds) {
            logger.warn(String.valueOf(groupId));
            GroupArtist groupArtist = groupArtistRepository.findById(groupId).orElse(null);
            if (groupArtist != null) {
                groupArtists.add(groupArtist);
            }
        }

        return groupArtists;
    }



    // Delete Solo Artist
    public void deleteSoloArtist(int id) {
        soloArtistRepository.deleteById(id);
    }

    // Delete Group Artist
    public void deleteGroupArtist(int id) {
        groupArtistRepository.deleteById(id);
    }
}
