package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends CrudRepository<Cart,Long> {

    Optional<Cart> findByUserId(Long userId);
}
