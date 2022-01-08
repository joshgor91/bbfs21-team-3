package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.backend.model.CartItem;
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

    @Autowired
    ProductRepository productRepo;

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
        var cartItems= cartItemRepo.findAllByCartId(cartId).orElseThrow();
        var order = new OrderDetails(userId, total);
        var orderStatus = createOrder(cartItems, order);
        if (!orderStatus.equals("success"))
            return orderStatus;
        cartItemRepo.deleteAllByCartId(cartId);
        cart.totalCost = 0F;
        cartRepo.save(cart);

        return "success";
    }

    @CrossOrigin
    @PostMapping("/addGuestOrder")
    String createGuestOrder (@RequestBody List<CartItem> cartItems, @RequestHeader String email, @RequestHeader Float total) {
        var order = new OrderDetails(email, total);
        var orderStatus = createOrder(cartItems, order);
        if (!orderStatus.equals("success"))
            return orderStatus;
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

    String createOrder(List<CartItem> cartItems, OrderDetails order) {
        orderDetailsRepo.save(order);
        var orderItems = new ArrayList<OrderItem>();
        var updatedProducts = new ArrayList<Product>();
        for(var item : cartItems){
            var prodId = item.getProductId();
            var itemQty = item.getQuantity();
            var product = productRepo.findById(prodId).get();
            //AYE YO FRONTEND!!! WE MIGHT BE ABLE TO CALCULATE CURRENT REGULAR AND SALE PRICES IN THE BACKEND
            //JAVA HAS METHODS FOR COMPARING DATES
//            var isBefore = product.scheduledPrices.get(0).getEffectiveDate().before(new Date());
//            var regPrice = product.scheduledPrices.get(0).getPrice();
            var unitsInStock = product.unitsInStock;
            if (itemQty > unitsInStock)
                return "Sorry, not enough units in stock for " + product.productName + ".";
            else {
                var orderItem = new OrderItem(prodId, order.orderDetailsId, itemQty);
                orderItems.add(orderItem);
                product.unitsInStock -= itemQty;
                updatedProducts.add(product);
            }
        }
        productRepo.saveAll(updatedProducts);
        orderItemsRepo.saveAll(orderItems);

        return "success";
    }
}
