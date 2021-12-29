package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @ManyToOne
    @JsonProperty
    public Product product;

    @JsonProperty
    @Column(name = "category_name")
    public String categoryName;

}
