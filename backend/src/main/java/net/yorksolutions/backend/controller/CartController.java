package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.yorksolutions.backend.model.*;
import net.yorksolutions.backend.repository.CartItemRepository;
import net.yorksolutions.backend.repository.CartRepository;
import net.yorksolutions.backend.repository.CategoryRepo;
import net.yorksolutions.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;
import java.util.*;

class CartItemOutput {
    @JsonProperty
    private Long cartId;
    @JsonProperty
    private Set<Category> categories;
    @JsonProperty
    private Long productId;
    @JsonProperty
    private List<ScheduledPrices> scheduledPrices;
    @JsonProperty
    private List<Sales> sales;
    @JsonProperty
    private String productName;
    @JsonProperty
    private String productDescription;
    @JsonProperty
    private String brand;
    @JsonProperty
    private Float unitPrice;
    @JsonProperty
    private int unitsInStock;
    @JsonProperty
    private String size;
    @JsonProperty
    private String color;
    @JsonProperty
    private Date productAvailable;
    @JsonProperty
    private Boolean discontinued;
    @JsonProperty
    private Boolean discountAvailable;
    @JsonProperty
    private String picture;
    @JsonProperty
    private Date dateReceived;
    @JsonProperty
    private int unitsReceived;
    @JsonProperty
    private int quantity;
    @JsonProperty
    private Float regularPrice;
    @JsonProperty
    private Float salePrice;

    private CartItemOutput(){
    }

    public CartItemOutput(Long cartId, Set<Category> categories, Long productId, List<ScheduledPrices> scheduledPrices, List<Sales> sales, String productName,
                          String productDescription, String brand,
                          Float unitPrice, int unitsInStock, String size, String color, Date productAvailable,
                          Boolean discontinued, Boolean discountAvailable,
                          String picture, Date dateReceived, int unitsReceived, int quantity,
                          Float regularPrice, Float salePrice) {
        this.cartId = cartId;
        this.categories = categories;
        this.productId = productId;
        this.scheduledPrices = scheduledPrices;
        this.sales = sales;
        this.productName = productName;
        this.productDescription = productDescription;
        this.brand = brand;
        this.unitPrice = unitPrice;
        this.unitsInStock = unitsInStock;
        this.size = size;
        this.color = color;
        this.productAvailable = productAvailable;
        this.discontinued = discontinued;
        this.discountAvailable = discountAvailable;
        this.picture = picture;
        this.dateReceived = dateReceived;
        this.unitsReceived = unitsReceived;
        this.quantity = quantity;
        this.regularPrice = regularPrice;
        this.salePrice = salePrice;
    }
}

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    CartRepository cartRepo;

    @Autowired
    CartItemRepository cartItemRepo;

    @Autowired
    ProductRepository productRepo;

    ObjectMapper objectMapper = new ObjectMapper();

    @CrossOrigin
    @PostMapping("/add")
    String addItemToCart(@RequestBody CartItem item) throws JsonProcessingException {
        System.out.println(objectMapper.writeValueAsString(item));
        cartRepo.findById(item.getCartId()).orElseThrow();
        productRepo.findById(item.getProductId()).orElseThrow();
        var existingCartItem = cartItemRepo.findByCartIdAndProductId(item.getCartId(), item.getProductId());
        existingCartItem.ifPresent(cartItem -> item.setQuantity(cartItem.getQuantity() + item.getQuantity()));

        cartItemRepo.save(item);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/usercart")
    Optional<Cart> getUserCart(@RequestHeader Long userId) {
        return cartRepo.findByUserId(userId);
    }



    @CrossOrigin
    @GetMapping("/viewCart/{userid}")
    Iterable<CartItemOutput> viewCart(@PathVariable Long userid) {
        var cart = cartRepo.findByUserId(userid).orElseThrow();
        var cartId = cart.getId();
        List<Object[]> cartItemDetails = cartItemRepo.findCartItemsByCartId(cartId);
        ArrayList<CartItemOutput> cartItems = new ArrayList<>();
        for (var itemDetail : cartItemDetails) {
            Product p = (Product) itemDetail[0];
            CartItem c = (CartItem) itemDetail[1];
            var cartItem = new CartItemOutput(c.getCartId(), p.getCategories(), c.getProductId(), p.getScheduledPrices(), p.getSales(), p.productName, p.productDescription,
                    p.brand, p.unitPrice, p.unitsInStock, p.size, p.color, p.productAvailable, p.discontinued, p.discountAvailable,
                    p.picture, p.dateReceived, p.unitsReceived, c.getQuantity(), c.getRegularPrice(), c.getSalePrice());
            cartItems.add(cartItem);
        }

        return cartItems;
    }

    @CrossOrigin
    @DeleteMapping("/delete/{cartId}/{prodId}")
    String deleteProductById(@PathVariable Long cartId, @PathVariable Long prodId) {
        cartItemRepo.findByCartIdAndProductId(cartId, prodId).orElseThrow();
        cartItemRepo.deleteByCartIdAndProductId(cartId, prodId);
        return "success";
    }

    @CrossOrigin
    @PutMapping("/edit")
    String editCartItem(@RequestBody CartItem item) {
        cartItemRepo.findByCartIdAndProductId(item.getCartId(), item.getProductId()).orElseThrow();
        if (item.getQuantity() == 0)
            cartItemRepo.deleteByCartIdAndProductId(item.getCartId(), item.getProductId());
        else
            cartItemRepo.save(item);
        return "success";
    }
}
