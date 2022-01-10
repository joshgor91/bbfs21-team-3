package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
public class Coupon {
    @Id
    @JsonProperty
    public String couponCode;

    @JsonProperty
    public Date startDate;

    @JsonProperty
    public Date endDate;

    @JsonProperty
    public Float discount;

    @JsonProperty
    public String description;

    @JsonProperty
    public Integer useLimit;

    @JsonProperty
    @ElementCollection
    public List<OrderDetails> orders;

    public Coupon() {

    }
}