package com.ciit.spossbackend.controller;

import com.ciit.spossbackend.model.OrderItem;
import com.ciit.spossbackend.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling OrderItem-related API endpoints.
 */
@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    /**
     * GET endpoint to retrieve all order items.
     * 
     * @return List of all order items.
     */
    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    /**
     * GET endpoint to retrieve an order item by its ID.
     * 
     * @param id The ID of the order item to retrieve.
     * @return The order item with the specified ID.
     */
    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }

    /**
     * POST endpoint to create a new order item.
     * 
     * @param orderItem The order item object to be created.
     * @return The created order item object.
     */
    @PostMapping
    public OrderItem saveOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.saveOrderItem(orderItem);
    }

    /**
     * PUT endpoint to update an existing order item.
     * 
     * @param id               The ID of the order item to update.
     * @param orderItemDetails The updated order item details.
     * @return The updated order item object.
     */
    @PutMapping("/{id}")
    public OrderItem updateOrderItem(@PathVariable Long id, @RequestBody OrderItem orderItemDetails) {
        return orderItemService.updateOrderItem(id, orderItemDetails);
    }

    /**
     * DELETE endpoint to delete an order item by its ID.
     * 
     * @param id The ID of the order item to delete.
     */
    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
    }
}
