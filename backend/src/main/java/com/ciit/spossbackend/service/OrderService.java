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

    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    public Orders getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Orders saveOrder(Orders order) {
        for (OrderItem item : order.getOrderItems()) {
            Optional<Product> product = productRepository.findById(item.getProduct().getId());
            item.setProduct(product.orElse(null));
            item.setOrder(order);
            item.calculatePrice();
        }
        order.calculateTotalAmount(); // Ensure total amount calculation is invoked
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
