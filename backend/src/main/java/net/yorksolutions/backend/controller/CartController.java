package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.backend.model.*;
import net.yorksolutions.backend.repository.CartItemRepository;
import net.yorksolutions.backend.repository.CartRepository;
import net.yorksolutions.backend.repository.CategoryRepo;
import net.yorksolutions.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EmbeddedId;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import java.util.Optional;

class CartItemInput {

    private Long productId;
    private Long cartId;

    public CartItemInput(Long productId, Long cartId) {
        this.productId = productId;
        this.cartId = cartId;
    }

    public CartItemInput() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
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




    @CrossOrigin
    @PostMapping("/add")
    String addItemToCart(@RequestBody CartItemInput input) {
        System.out.println(input.getCartId());
        System.out.println(input.getProductId());
       Optional<Cart> response =  cartRepo.findById(input.getCartId());
       Cart cart= response.get();
       Optional<Product> productResponse= productRepo.findById(input.getProductId());
//       CartItemId cartItemId = new CartItemId(input.getCartId(), input.getProductId());
       CartItem cartItem= new CartItem( productResponse.get(), cart, 1);
        cart.addCartItem(cartItem);
        cartRepo.save(cart);

        return "success";
    }



    @CrossOrigin
    @GetMapping("/viewCart/{userid}")
    Iterable<CartItem> viewCart(@PathVariable Long userid) {

//        var cartid = cartRepo.findByUserId(userid).get().id;
//        return cartItemRepo.findAllByCartId(cartid);
//    }
        var cart = cartRepo.findByUserId(userid).get();
        return cart.viewCartItems();
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    String deleteProductById(@PathVariable Long id) {
        cartItemRepo.deleteById(id);
        return "success";
    }

//    @CrossOrigin
//    @PutMapping("/edit")
//        // returning string to notify the front end that the admin successfully edited the user.
//    String editThree(@RequestBody User user) {
//        cartItemRepo.findById(user.getId()).orElseThrow();
////        cartItemRepo.save(user);
//        return "success";
//
//    }


}
