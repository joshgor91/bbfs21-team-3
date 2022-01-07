package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.backend.model.OrderDetails;
import net.yorksolutions.backend.model.OrderItem;
import net.yorksolutions.backend.model.Product;
import net.yorksolutions.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    class OrderItemsOutput extends Product{
        @JsonProperty
        private int quantity;

        public OrderItemsOutput(Long id, String productName, String productDescription, String brand, Float unitPrice, int unitsInStock, String size, String color, Date productAvailable, Boolean discontinued, Boolean discountAvailable, String picture, Date dateReceived, int unitsReceived, int quantity) {
            super(id, productName, productDescription, brand, unitPrice, unitsInStock, size, color, productAvailable, discontinued, discountAvailable, picture, dateReceived, unitsReceived);
            this.quantity = quantity;
        }
    }

    class OrderHistoryOutput {
        @JsonProperty
        private List<OrderItemsOutput> orderItems;
        @JsonProperty
        private OrderDetails orderDetails;

        public OrderHistoryOutput(List<OrderItemsOutput> orderItems, OrderDetails orderDetails) {
            this.orderItems = orderItems;
            this.orderDetails = orderDetails;
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
    OrderHistoryOutput viewOrder(@RequestHeader Long orderId){
        var order = orderDetailsRepo.findById(orderId).orElseThrow();
        List<Object[]> orderItemDetails = orderItemsRepo.findByOrderDetailsId(orderId);
        ArrayList<OrderItemsOutput> orderInfo = new ArrayList<>();
        for (var itemDetail : orderItemDetails) {
            Product p = (Product) itemDetail[0];
            OrderItem oi = (OrderItem) itemDetail[1];
            var orderDetails = new OrderItemsOutput(p.id, p.productName, p.productDescription, p.brand, p.unitPrice, p.unitsInStock, p.size,
                    p.color, p.productAvailable, p.discontinued, p.discountAvailable, p.picture, p.dateReceived, p.unitsReceived, oi.getQuantity());
            orderInfo.add(orderDetails);
        }

        return new OrderHistoryOutput(orderInfo, order);
    }

    @CrossOrigin
    @GetMapping("/orderHistory")
    Iterable<OrderHistoryOutput> viewOrders(@RequestHeader Long userId){
        var orders = orderDetailsRepo.findAllByUserId(userId).orElseThrow();
        List<OrderHistoryOutput> orderHistory = new ArrayList<>();
        for (var order : orders) {
            List<OrderItemsOutput> orderInfo = new ArrayList<>();
            List<Object[]> orderItemDetails = orderItemsRepo.findByOrderDetailsId(order.orderDetailsId);
            for (var itemDetail : orderItemDetails) {
                Product p = (Product) itemDetail[0];
                OrderItem oi = (OrderItem) itemDetail[1];
                var orderDetails = new OrderItemsOutput(p.id, p.productName, p.productDescription, p.brand, p.unitPrice, p.unitsInStock, p.size,
                        p.color, p.productAvailable, p.discontinued, p.discountAvailable, p.picture, p.dateReceived, p.unitsReceived, oi.getQuantity());
                orderInfo.add(orderDetails);
            }
            orderHistory.add(new OrderHistoryOutput(orderInfo, order));
        }

        return orderHistory;
    }
}
