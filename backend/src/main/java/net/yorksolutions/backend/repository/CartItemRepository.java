package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.CartItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends CrudRepository<CartItem,Long> {
    Iterable<CartItem>findAllByCartId(Long cartId);

    @Query("select p, c from Product p inner join CartItem c on p.id = c.productId where c.cartId = :cartId")
    List<Object[]> findCartItemsByCartId(@Param("cartId") Long cartId);

    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);

    void deleteByCartIdAndProductId(Long cartId, Long productId);
}
