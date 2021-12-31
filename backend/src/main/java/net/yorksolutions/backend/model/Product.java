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
    @Column (name = "product_id")
    @JsonProperty
    public Long id;

    @JsonProperty
    @JsonIgnoreProperties("products")
    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "product_category",
            joinColumns = { @JoinColumn(name = "product_id")},
            inverseJoinColumns = { @JoinColumn(name = "category_id")}
    )
    Set<Category> categories = new HashSet<>();

    public void deleteCategory(Long id) {
        categories.removeIf(catId -> (catId.getId() == id));
    }

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
