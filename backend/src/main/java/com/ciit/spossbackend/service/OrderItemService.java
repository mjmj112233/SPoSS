package com.ciit.spossbackend.service;

import com.ciit.spossbackend.model.OrderItem;
import com.ciit.spossbackend.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    /**
     * Retrieves all order items from the database.
     *
     * @return List of all order items.
     */
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    /**
     * Retrieves an order item by its ID.
     *
     * @param id The ID of the order item to retrieve.
     * @return The order item with the given ID, or null if not found.
     */
    public OrderItem getOrderItemById(Long id) {
        return orderItemRepository.findById(id).orElse(null);
    }

    /**
     * Saves or updates an order item.
     *
     * @param orderItem The order item to save or update.
     * @return The saved order item.
     */
    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    /**
     * Updates an order item with new details.
     *
     * @param id               The ID of the order item to update.
     * @param orderItemDetails The updated details of the order item.
     * @return The updated order item.
     */
    public OrderItem updateOrderItem(Long id, OrderItem orderItemDetails) {
        OrderItem orderItem = getOrderItemById(id);
        if (orderItem != null) {
            return orderItemRepository.save(orderItem);
        }
        return null; // Handle case where order item with given id is not found
    }

    /**
     * Deletes an order item by its ID.
     *
     * @param id The ID of the order item to delete.
     */
    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}
