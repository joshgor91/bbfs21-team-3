

package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.yorksolutions.backend.model.CartItem;
import net.yorksolutions.backend.model.Product;
import net.yorksolutions.backend.repository.CartItemRepository;
import net.yorksolutions.backend.repository.CartRepository;
import net.yorksolutions.backend.repository.CategoryRepo;
import net.yorksolutions.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    CartRepository cartRepo;

    @Autowired
    CartItemRepository cartItemRepo;

    @Autowired
    ProductRepository productRepository;




    @CrossOrigin
    @PostMapping("/add")
    String addItemToCart(@RequestBody CartItem item) {
        cartItemRepo.save(item);
        return "success";
    }

//    @CrossOrigin
//    @GetMapping("/viewCart/{userid}")
//    Iterable<CartItem> viewCart(@PathVariable Long userid) {
//
//        var cartid = cartRepo.findByUserId(userid).get().id;
//        return cartItemRepo.findAllByCartId(cartid);
//    }

    ObjectMapper objectMapper = new ObjectMapper();
    @CrossOrigin
    @GetMapping("/viewCart/{userid}")
    String viewCart(@PathVariable Long userid) throws JsonProcessingException {
        Iterable<Product> cartItems = productRepository.findAll();
        List<Object> cartList = new LinkedList<>();
        var cartId = cartRepo.findByUserId(userid).get().id;
        var cartItem = cartItemRepo.findAllByCartId(cartId);
//        System.out.println(objectMapper.writeValueAsString(cartItem));
        for (CartItem item : cartItem) {
//            System.out.println(objectMapper.writeValueAsString(item));
            for (Product pItem : cartItems ) {
//                System.out.println(objectMapper.writeValueAsString(pItem));
//                System.out.println(objectMapper.writeValueAsString(pItem.id.equals(item.productId)));
                if (item.productId.equals(pItem.id)) {
//                    System.out.println(pItem);
                    cartList.add(pItem);
                }
            }
        }
        System.out.println(cartList);
        return objectMapper.writeValueAsString(cartList);
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
