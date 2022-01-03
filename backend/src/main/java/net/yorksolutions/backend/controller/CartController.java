package net.yorksolutions.backend.controller;

import net.yorksolutions.backend.model.CartItem;
import net.yorksolutions.backend.model.Product;
import net.yorksolutions.backend.repository.CartItemRepository;
import net.yorksolutions.backend.repository.CartRepository;
import net.yorksolutions.backend.repository.CategoryRepo;
import net.yorksolutions.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    CartRepository cartRepo;

    @Autowired
    CartItemRepository cartItemRepo;




    @CrossOrigin
    @PostMapping("/add")
    String addItemToCart(@RequestBody CartItem item) {
        cartItemRepo.save(item);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/viewCart/{userid}")
    Iterable<CartItem> viewCart(@PathVariable Long userid) {

        var cartid = cartRepo.findByUserId(userid).get().id;
        return cartItemRepo.findAllByCartId(cartid);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    String deleteProductById(@PathVariable Long id) {
        cartItemRepo.deleteById(id);
        return "success";
    }


}
