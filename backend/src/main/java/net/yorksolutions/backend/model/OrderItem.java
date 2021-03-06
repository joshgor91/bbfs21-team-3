package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(OrderItemId.class)
public class OrderItem {
    @Id
    @JsonProperty
     Long productId;

    @Id
    @JsonProperty
     Long orderDetailsId;

    @JsonProperty
     int quantity;

    @JsonProperty
    Float regularPrice;

    @JsonProperty
    Float salePrice;

    public OrderItem() {
    }

    public OrderItem(int quantity) {
        this.quantity = quantity;
    }

    public OrderItem(Long productId, Long orderDetailsId, int quantity) {
        this.productId = productId;
        this.orderDetailsId = orderDetailsId;
        this.quantity = quantity;
    }

    public OrderItem(Long productId, Long orderDetailsId, int quantity, Float regularPrice, Float salePrice) {
        this.productId = productId;
        this.orderDetailsId = orderDetailsId;
        this.quantity = quantity;
        this.regularPrice = regularPrice;
        this.salePrice = salePrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public Float getRegularPrice() {
        return regularPrice;
    }

    public Float getSalePrice() {
        return salePrice;
    }
}
