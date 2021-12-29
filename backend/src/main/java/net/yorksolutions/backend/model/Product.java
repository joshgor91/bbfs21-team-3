package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column (name = "product_id")
    @JsonProperty
    public Long id;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "product_category",
            joinColumns = { @JoinColumn(name = "product_id")},
            inverseJoinColumns = { @JoinColumn(name = "category_id")}
    )
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
