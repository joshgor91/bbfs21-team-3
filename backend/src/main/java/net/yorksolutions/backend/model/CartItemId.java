package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

public class CartItemId implements Serializable {
    private Long cartId;
    private Long productId;
}
