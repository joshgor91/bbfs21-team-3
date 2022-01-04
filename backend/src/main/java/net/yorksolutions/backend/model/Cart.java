package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @JsonProperty
    public Float totalCost;

    @JsonProperty
    public Long userId;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "cart"
    )

    @JsonProperty
    private List<CartItem> cartItems = new ArrayList<>();



    public Cart(){};

    public Cart(Long userId) {
        this.userId = userId;
    }

    public void addCartItem(CartItem cartItem){
        if(!cartItems.contains(cartItem)){
            cartItems.add(cartItem);
        }
    }

    public void removeCartItem(CartItem cartItem){
        cartItems.remove(cartItem);

    }

    public List<CartItem> viewCartItems(){
        return cartItems;
    }

}
