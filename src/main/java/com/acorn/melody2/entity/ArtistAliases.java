package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ArtistAliases")
public class ArtistAliases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alias_id")
    private int aliasId;

    @Column(name = "alias_name", length = 100)
    private String aliasName;

    @ManyToOne
    @JoinColumn(name = "soloArtistId")
    private SoloArtist soloArtist;

    @ManyToOne
    @JoinColumn(name = "groupArtistId")
    private GroupArtist groupArtist;

    // Constructors, getters, and setters as needed
}
