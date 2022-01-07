package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.OrderItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends CrudRepository<OrderItem,Long> {
    @Query("select p, oi from Product p inner join OrderItem oi on p.id = oi.productId where oi.orderDetailsId = :orderId")
    List<Object[]> findByOrderDetailsId(@Param("orderId") Long orderId);

    @Query("select p, od, oi from Product p inner join OrderItem oi on p.id = oi.productId inner join OrderDetails od on od.orderDetailsId = oi.orderDetailsId where od.userId = :userId")
    List<Object[]> findAllByUserId(@Param("userId") Long userId);


}
