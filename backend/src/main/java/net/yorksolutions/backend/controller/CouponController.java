package net.yorksolutions.backend.controller;

import net.yorksolutions.backend.model.Coupon;
import net.yorksolutions.backend.model.OrderDetails;
import net.yorksolutions.backend.repository.CouponRepository;
import net.yorksolutions.backend.repository.OrderDetailsRepository;
import net.yorksolutions.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
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
        couponRepo.findById(coupon.couponCode).orElseThrow();
        couponRepo.save(coupon);
        return "success";
    }

    @CrossOrigin
    @GetMapping("/all")
    Iterable<Coupon> getAllCoupons() {
        return couponRepo.findAll();
    }

    @CrossOrigin
    @GetMapping("/couponCode")
    Coupon getCouponCode(@RequestHeader String couponCode) {
        return  couponRepo.findById(couponCode).orElseThrow();
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

    Object validateCoupon(@RequestHeader String couponCode, @RequestHeader Optional<Long> userId, @RequestHeader Optional<String> email) {
        var response = couponRepo.findById(couponCode);
        HashMap<String, Object> res = new HashMap<>();
        if (response.isEmpty())
            return res.put("message", "This coupon code is invalid. Please enter a valid coupon code.");
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
        else return res.put("message", "A userId or guest email must be provided to check coupon code validity.");

        if (numOfOrders >= coupon.useLimit)
            return res.put("message", "Sorry this coupon has reached its use limit.");

        if (coupon.startDate != null && coupon.endDate != null) {
            var currentDate = LocalDateTime.now();
            var startDate = coupon.startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            var endDate = coupon.endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            startDate = startDate.plusHours(6);
            endDate =  endDate.plusDays(1).plusHours(6).plusSeconds(-1);

            if (currentDate.isBefore(startDate) || currentDate.isAfter(endDate))
                return res.put("message", "Sorry, this coupon isn't currently eligible for redemption.");
        }

        res.put("message", "success");
        res.put("couponDiscount", coupon.discount);
        return res;
    }
}
