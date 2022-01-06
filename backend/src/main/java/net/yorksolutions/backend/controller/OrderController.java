package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.backend.model.OrderDetails;
import net.yorksolutions.backend.model.OrderItem;
import net.yorksolutions.backend.model.Product;
import net.yorksolutions.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderItemsRepository orderItemsRepo;

    @Autowired
    OrderDetailsRepository orderDetailsRepo;

    @Autowired
    CartRepository cartRepo;

    @Autowired
    CartItemRepository cartItemRepo;

    class OrderDetailsOutput extends Product{
        @JsonProperty
        private Long orderDetailsId;
        @JsonProperty
        private Float total;
        @JsonProperty
        private LocalDateTime dateCreated;
        @JsonProperty
        private int quantity;

        public OrderDetailsOutput(Long id, String productName, String productDescription, String brand, Float unitPrice, int unitsInStock, String size, String color, Date productAvailable, Boolean discontinued, Boolean discountAvailable, String picture, Date dateReceived, int unitsReceived, Long orderDetailsId, Float total, LocalDateTime dateCreated, int quantity) {
            super(id, productName, productDescription, brand, unitPrice, unitsInStock, size, color, productAvailable, discontinued, discountAvailable, picture, dateReceived, unitsReceived);
            this.orderDetailsId = orderDetailsId;
            this.total = total;
            this.dateCreated = dateCreated;
            this.quantity = quantity;
        }
    }

    @CrossOrigin
    @PostMapping("/add")
    String createOrder (@RequestHeader Long cartId) {
        var cart = cartRepo.findById(cartId).get();
        var userId = cart.userId;
        var total = cart.totalCost;
        var order = new OrderDetails(userId, total);
        orderDetailsRepo.save(order);
        var cartItems= cartItemRepo.findAllByCartId(cartId).orElseThrow();
        var orderItems = new ArrayList<OrderItem>();
        for(var item : cartItems){
            var orderItem = new OrderItem(item.getProductId(), order.orderDetailsId, item.getQuantity());
            orderItems.add(orderItem);
        }
        orderItemsRepo.saveAll(orderItems);
        cartItemRepo.deleteAllByCartId(cartId);
        cart.totalCost = 0F;
        cartRepo.save(cart);

        return "success";
    }

    @CrossOrigin
    @GetMapping("/viewOrder")
    List<OrderDetailsOutput> viewOrder(@RequestHeader Long orderId){
        List<Object[]> orderItemDetails = orderItemsRepo.findByOrderDetailsId(orderId);
        ArrayList<OrderDetailsOutput> orderInfo = new ArrayList<>();
        for (var itemDetail : orderItemDetails) {
            Product p = (Product) itemDetail[0];
            OrderDetails od = (OrderDetails) itemDetail[1];
            OrderItem oi = (OrderItem) itemDetail[2];
            var orderDetails = new OrderDetailsOutput(p.id, p.productName, p.productDescription, p.brand, p.unitPrice, p.unitsInStock, p.size,
                    p.color, p.productAvailable, p.discontinued, p.discountAvailable, p.picture, p.dateReceived, p.unitsReceived,
                    od.orderDetailsId, od.total, od.dateCreated, oi.getQuantity());
            orderInfo.add(orderDetails);
        }

        return orderInfo;
    }

    @CrossOrigin
    @GetMapping("/orderHistory")
    Iterable<ArrayList<OrderDetailsOutput>> viewOrders(@RequestHeader Long userId){
        var orders = orderDetailsRepo.findAllByUserId(userId).get();
        ArrayList<ArrayList<OrderDetailsOutput>> orderHistory = new ArrayList<>();
        for (var order : orders) {
            ArrayList<OrderDetailsOutput> orderInfo = new ArrayList<>();
            List<Object[]> orderHistoryDetails = orderItemsRepo.findByOrderDetailsId(order.orderDetailsId);
            for (var itemDetail : orderHistoryDetails) {
                Product p = (Product) itemDetail[0];
                OrderDetails od = (OrderDetails) itemDetail[1];
                OrderItem oi = (OrderItem) itemDetail[2];
                var orderDetails = new OrderDetailsOutput(p.id, p.productName, p.productDescription, p.brand, p.unitPrice, p.unitsInStock, p.size,
                        p.color, p.productAvailable, p.discontinued, p.discountAvailable, p.picture, p.dateReceived, p.unitsReceived,
                        od.orderDetailsId, od.total, od.dateCreated, oi.getQuantity());
                orderInfo.add(orderDetails);
            }
            orderHistory.add(orderInfo);
        }

        return orderHistory;
    }
}
