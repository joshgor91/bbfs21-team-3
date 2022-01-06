package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;

@Embeddable
public class Sales {
    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long salesProductId;

    @JsonProperty
    public LocalDateTime saleStartDate;

    @JsonProperty
    public LocalDateTime saleEndDate;

    @JsonProperty
    @Column(precision=4, scale=4)
    public Float discount;

    public Sales() {
    }

    public Sales(Long salesProductId, LocalDateTime saleStartDate, LocalDateTime saleEndDate, Float discount) {
        this.salesProductId = salesProductId;
        this.saleStartDate = saleStartDate;
        this.saleEndDate = saleEndDate;
        this.discount = discount;
    }
}
