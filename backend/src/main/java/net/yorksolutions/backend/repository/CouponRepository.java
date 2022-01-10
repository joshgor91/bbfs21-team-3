package net.yorksolutions.backend.repository;

import net.yorksolutions.backend.model.Coupon;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends CrudRepository<Coupon, String> {
}
