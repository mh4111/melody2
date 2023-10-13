package com.acorn.melody2.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Genre")
@Data
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Genre_ID")
    private int genreId;

    @Column(name = "Genre_Name")
    private String genreName;

    // Getter and setter methods
}
