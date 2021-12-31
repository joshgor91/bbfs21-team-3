package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @JsonProperty
    public Long userId;

    @JsonProperty
    public String address1;

    @JsonProperty
    public String address2;

    @JsonProperty
    public String city;

    @JsonProperty
    public String state;


    @JsonProperty
    public Integer zipcode;

}

