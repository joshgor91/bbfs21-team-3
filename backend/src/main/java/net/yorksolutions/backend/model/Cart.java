package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;



    @JsonProperty
    public Float totalCost;

    @JsonProperty
    public Long customerId;

    public Cart(){};

    public Cart(Long customerId) {
        this.customerId = customerId;
    }
}
