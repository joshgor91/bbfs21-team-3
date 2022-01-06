package net.yorksolutions.backend.controller;

import net.yorksolutions.backend.model.Category;
import net.yorksolutions.backend.model.Product;
import net.yorksolutions.backend.model.User;
import net.yorksolutions.backend.repository.CategoryRepo;
import net.yorksolutions.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

class IdCat {
    public Long id;
    public String categoryName;

    public IdCat(Long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }
}

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepo;

    @Autowired
    CategoryRepo categoryRepo;

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
    @PutMapping("/category/edit")
    String editCategory(@RequestBody Category category) {
        categoryRepo.findById(category.id).orElseThrow();
        categoryRepo.save(category);
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
    @PostMapping("/category/add")
    String addCategory(@RequestBody Category newCategory) {
        categoryRepo.save(newCategory);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/category/all")
    Iterable<Category> all2() {
        return categoryRepo.findAll();
    }
    @CrossOrigin
    @DeleteMapping("/category/delete/{id}/{categoryId}")
    String deleteCategoryById(@PathVariable Long id, @PathVariable Long categoryId) {
        Optional<Product> response = productRepo.findById(id);
        if(response.isPresent()) {
            Product prod = response.get();
            prod.deleteCategory(categoryId);
            productRepo.save(prod);
        }
        return "success";
    }
    @CrossOrigin
    @GetMapping("/getbyname/{category}")
    Iterable<Product> getByCategory(@PathVariable String category) {
        return productRepo.findByCategories_CategoryName(category);
    }

    @CrossOrigin
    @PostMapping("/getbyIdCat")
    Product getByIdCat(@RequestBody IdCat input) {
        return productRepo.findByIdAndCategories_CategoryName(input.id, input.categoryName);
    }

}
