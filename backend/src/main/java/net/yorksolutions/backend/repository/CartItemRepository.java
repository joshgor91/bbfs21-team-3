package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends CrudRepository<CartItem,Long> {
    Iterable<CartItem>findAllByCartId(Long cartId);
}
