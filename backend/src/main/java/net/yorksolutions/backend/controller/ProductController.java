package net.yorksolutions.backend.controller;

import net.yorksolutions.backend.model.Product;
import net.yorksolutions.backend.model.User;
import net.yorksolutions.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepo;

    @CrossOrigin
    @GetMapping("/all")
    Iterable<Product> all() {
        return productRepo.findAll();
    }

    @CrossOrigin
    @PostMapping("/add")
    String addProduct(@RequestBody Product newProduct) {
        productRepo.save(newProduct);
        return "success";
    }

    @CrossOrigin
    @PutMapping("/edit")
    String editProduct(@RequestBody Product product) {
        productRepo.findById(product.id).orElseThrow();
        productRepo.save(product);
        return "success";
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    String deleteProductById(@PathVariable Long id) {
        productRepo.deleteById(id);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/getById/{id}")
    Product getProductById(@PathVariable Long id) {
        return productRepo.findById(id).get();
    }

    @CrossOrigin
    @GetMapping("/getbyname/{category}")
    Iterable<Product> getByCategory(@PathVariable String category) {
        return productRepo.findByCategories_CategoryName(category);
    }

}
