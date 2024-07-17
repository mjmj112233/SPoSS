package com.ciit.spossbackend.service;

import com.ciit.spossbackend.model.OrderItem;
import com.ciit.spossbackend.model.Orders;
import com.ciit.spossbackend.model.Product;
import com.ciit.spossbackend.repository.OrderRepository;
import com.ciit.spossbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    /**
     * Retrieves all orders from the database.
     *
     * @return List of all orders.
     */
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Retrieves an order by its ID.
     *
     * @param id The ID of the order to retrieve.
     * @return The order with the given ID, or null if not found.
     */
    public Orders getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    /**
     * Saves an order, including its order items.
     *
     * @param order The order to save.
     * @return The saved order.
     */
    public Orders saveOrder(Orders order) {
        // Iterate through order items to set product and calculate prices
        for (OrderItem item : order.getOrderItems()) {
            Optional<Product> product = productRepository.findById(item.getProduct().getId());
            item.setProduct(product.orElse(null));
            item.setOrder(order);
            item.calculatePrice(); // Calculate price based on product and quantity
        }
        order.calculateTotalAmount(); // Calculate total amount for the order
        return orderRepository.save(order);
    }

    /**
     * Deletes an order by its ID.
     *
     * @param id The ID of the order to delete.
     */
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
