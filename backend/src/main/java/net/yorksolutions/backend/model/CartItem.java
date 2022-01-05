package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@IdClass(CartItemId.class)
public class CartItem {
    @Id
    @JsonProperty
    Long cartId;

    @Id
    @JsonProperty
    Long productId;

    @JsonProperty
    int quantity;

    public CartItem(){
    }

    public Long getCartId() {
        return cartId;
    }

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
