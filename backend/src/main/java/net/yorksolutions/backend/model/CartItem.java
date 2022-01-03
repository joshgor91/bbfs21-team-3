package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @JsonProperty

    @JoinColumn(

    )
    public Long productId;

    @JsonProperty
    public Integer quantity;

    @JsonProperty
    public Long cartId;

}
