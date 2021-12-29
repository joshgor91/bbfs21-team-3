package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @JsonProperty
    public String product_name;

    @JsonProperty
    public String product_description;

    @JsonProperty
    public String brand;

    @JsonProperty
    public Float unit_price;

    @JsonProperty
    public int units_in_stock;

    @JsonProperty
    public String size;

    @JsonProperty
    public String color;

    @JsonProperty
    public Date product_available;

    @JsonProperty
    public Boolean discontinued;

    @JsonProperty
    public Boolean discount_available;

    @JsonProperty
    public String picture;

    @JsonProperty
    public Date date_recieved;

    @JsonProperty
    public int units_recieved;

}
