package net.yorksolutions.backend.controller;

import net.yorksolutions.backend.model.Coupon;
import net.yorksolutions.backend.model.OrderDetails;
import net.yorksolutions.backend.repository.CouponRepository;
import net.yorksolutions.backend.repository.OrderDetailsRepository;
import net.yorksolutions.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/coupon")
public class CouponController {
    @Autowired
    CouponRepository couponRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    OrderDetailsRepository orderDetailsRepo;

    @CrossOrigin
    @PostMapping("add")
    String addCoupon(@RequestBody Coupon coupon) {
        var response = couponRepo.findById(coupon.couponCode);
        if (response.isPresent())
            return "Sorry, this coupon code already exists.";
        couponRepo.save(coupon);
        return "success";
    }

    @CrossOrigin
    @PutMapping("edit")
    String editCoupon(@RequestBody Coupon coupon) {
        var response = couponRepo.findById(coupon.couponCode);
        if (response.isPresent() && !response.get().couponCode.equals(coupon.couponCode))
            return "Sorry, this coupon code already exists.";
        couponRepo.save(coupon);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/all")
    Iterable<Coupon> getAllCoupons() {
        return couponRepo.findAll();
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    String deleteCoupon(@RequestHeader String couponCode) {
        couponRepo.findById(couponCode).orElseThrow();
        couponRepo.deleteById(couponCode);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/validateCoupon")
    String validateCoupon(@RequestHeader String couponCode, @RequestHeader Optional<Long> userId, @RequestHeader Optional<String> email) {
        var response = couponRepo.findById(couponCode);
        if (response.isEmpty())
            return "This coupon code is invalid. Please enter a valid coupon code.";
        var coupon = response.get();
        Stream<OrderDetails> couponOrders;
        long numOfOrders = 0;

        if (userId.isPresent()) {
            userRepo.findById(userId.get()).orElseThrow();
            couponOrders = coupon.orders.stream().filter(orderDetails -> orderDetails.userId.equals(userId.get()));
            numOfOrders = couponOrders.count();
        }
        else if (email.isPresent()) {
            var orders = orderDetailsRepo.findAllByEmail(email.get());
            if (orders.isEmpty())
                throw new NoSuchElementException("No orders associated with the email '" + email.get() + "'.");
            couponOrders = coupon.orders.stream().filter(orderDetails -> orderDetails.email.equals(email.get()));
            numOfOrders = couponOrders.count();
        }
        else return "A userId or guest email must be provided to check coupon code validity.";

        if (numOfOrders >= coupon.useLimit)
            return "Sorry this coupon has reached its use limit.";
        return "success";
    }
}
