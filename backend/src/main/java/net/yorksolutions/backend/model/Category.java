package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    @JsonProperty
    public Long categoryId;

    @ManyToMany(mappedBy = "categories")
    @JsonProperty
    public Set<Product> products = new HashSet<>();

    @JsonProperty
    @Column(name = "category_name")
    public String categoryName;

}
