package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.OrderDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailsRepository extends CrudRepository<OrderDetails,Long> {
    Optional<List<OrderDetails>> findAllByUserId(Long userId);
    List<OrderDetails> findAllByEmail(String email);
}
