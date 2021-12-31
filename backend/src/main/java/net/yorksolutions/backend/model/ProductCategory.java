/*
package net.yorksolutions.backend.model;

import javax.persistence.*;

@Entity
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_category_id")
    public Long productCategoryId;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable (
            name = "track",
            joinColumns = { @JoinColumn(name = "product_category_id")},
            inverseJoinColumns = {@JoinColumn(name = "")}
    )
}
*/
