package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @OneToMany
    @JsonProperty
    Set<Category> categories;

    @JsonProperty
    @Column(name = "product_name")
    public String productName;

    @JsonProperty
    @Column(name = "product_description")
    public String productDescription;

    @JsonProperty
    public String brand;

    @JsonProperty
    @Column(name = "unit_price")
    public Float unitPrice;

    @JsonProperty
    @Column(name = "units_in_stock")
    public int unitsInStock;

    @JsonProperty
    public String size;

    @JsonProperty
    public String color;

    @JsonProperty
    @Column(name = "product_available")
    public Date productAvailable;

    @JsonProperty
    public Boolean discontinued;

    @JsonProperty
    @Column(name = "discount_available")
    public Boolean discountAvailable;

    @JsonProperty
    public String picture;

    @JsonProperty
    @Column(name = "date_received")
    public Date dateReceived;

    @JsonProperty
    @Column(name = "units_received")
    public int unitsReceived;

}
