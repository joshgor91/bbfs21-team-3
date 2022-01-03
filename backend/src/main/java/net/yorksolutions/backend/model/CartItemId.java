package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CartItemId implements Serializable {

    @JsonProperty
    private Long cartId;

    @JsonProperty
    private Long productId;


    public CartItemId(Long cartId, Long productId) {
        this.cartId = cartId;
        this.productId = productId;
    }

    public CartItemId() {
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItemId that = (CartItemId) o;
        return Objects.equals(cartId, that.cartId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cartId, productId);
    }
}
