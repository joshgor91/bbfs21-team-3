package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;
import java.util.Date;

@Embeddable
public class MinimumAdvertisedPrice {
    @JsonProperty
    private Float price;

    @JsonProperty
    private Date effectiveDate;


    public MinimumAdvertisedPrice() {
    }

    public MinimumAdvertisedPrice(Float price, Date effectiveDate) {
        this.price = price;
        this.effectiveDate = effectiveDate;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Date getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }
}
