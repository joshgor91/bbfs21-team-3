package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class CartItem {


    @EmbeddedId
    @JsonProperty
    private CartItemId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(
            name = "productId"
    )
    @JsonProperty
    @JsonIgnoreProperties("cartItems")
    private Product product;

    @ManyToOne
    @MapsId("cartId")
    @JoinColumn(
            name = "cartId"
    )
    @JsonProperty
    @JsonIgnoreProperties("cartItems")
    private Cart cart;

    @JsonProperty
    private Integer quantity;

    public CartItem(CartItemId id, Product product, Cart cart, Integer quantity) {
        this.id = id;
        this.product = product;
        this.cart = cart;
        this.quantity = quantity;
    }

    public CartItem() {
    }

    public CartItem(Product product, Cart cart, Integer quantity) {
        this.product = product;
        this.cart = cart;
        this.quantity = quantity;
    }

    public CartItemId getId() {
        return id;
    }

    public void setId(CartItemId id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
