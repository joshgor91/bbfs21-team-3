package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;

@Embeddable
public class Sales {


    @JsonProperty
    public LocalDateTime saleStartDate;

    @JsonProperty
    public LocalDateTime saleEndDate;

    @JsonProperty
    @Column(precision=4, scale=4)
    public Float discount;

    @JsonProperty
    public String saleDescription;

    public Sales() {
    }

    public Sales( LocalDateTime saleStartDate, LocalDateTime saleEndDate, Float discount, String saleDescription) {
        this.saleStartDate = saleStartDate;
        this.saleEndDate = saleEndDate;
        this.discount = discount;
        this.saleDescription= saleDescription;
    }
}
