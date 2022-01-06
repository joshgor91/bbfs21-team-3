package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class OrderDetails {
    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long	orderDetailsId;

    @JsonProperty
    public Long userId;

    @JsonProperty
    public Float total;

    @JsonProperty
    public LocalDateTime dateCreated;

    public OrderDetails() {
    }

    public OrderDetails(Long userid, Float total) {
        this.userId = userid;
        this.total = total;
        this.dateCreated = LocalDateTime.now();
    }
}
