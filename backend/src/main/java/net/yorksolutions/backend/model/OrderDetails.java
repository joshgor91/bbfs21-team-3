package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Embeddable
public class OrderDetails {
    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long	orderDetailsId;

    @JsonProperty
    public Long userId;

    @JsonProperty
    public String email;

    @JsonProperty
    public Float total;

    @JsonProperty
    public LocalDateTime dateCreated;

    public OrderDetails() {
    }

    public OrderDetails(Long userid, Float total, String email) {
        this.userId = userid;
        this.total = total;
        this.email = email;
        this.dateCreated = LocalDateTime.now();
    }

    public OrderDetails(String email, Float total) {
        this.email = email;
        this.total = total;
        this.dateCreated = LocalDateTime.now();
    }
}
