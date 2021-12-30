package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product,Long>{

    Iterable<Product> findByCategories_CategoryName(String name);
    Product findByIdAndCategories_CategoryName(Long id, String name);
}
