package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Embeddable
public class Sales {

    @JsonProperty
    public Date saleStartDate;

    @JsonProperty
    public Date saleEndDate;

    @JsonProperty
    @Column(precision=4, scale=4)
    public Float discount;

    @JsonProperty
    public String saleDescription;

    public Sales() {
    }

    public Sales( Date saleStartDate, Date saleEndDate, Float discount, String saleDescription) {
        this.saleStartDate = saleStartDate;
        this.saleEndDate = saleEndDate;
        this.discount = discount;
        this.saleDescription= saleDescription;
    }
}
