package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JsonIgnoreProperties("products")
    @JsonProperty
    Set<Category> categories = new HashSet<>();


    @JsonProperty
    public String productName;

    @JsonProperty
    public String productDescription;

    @JsonProperty
    public String brand;

    @JsonProperty
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

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
