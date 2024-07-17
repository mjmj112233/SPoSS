package com.ciit.spossbackend.controller;

import com.ciit.spossbackend.model.Orders;
import com.ciit.spossbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling Order-related API endpoints.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService service;

    @Autowired
    public OrderController(OrderService service) {
        this.service = service;
    }

    /**
     * GET endpoint to retrieve all orders.
     * 
     * @return List of all orders.
     */
    @GetMapping
    public List<Orders> getAllOrders() {
        return service.getAllOrders();
    }

    /**
     * GET endpoint to retrieve an order by its ID.
     * 
     * @param id The ID of the order to retrieve.
     * @return The order with the specified ID.
     */
    @GetMapping("/{id}")
    public Orders getOrderById(@PathVariable Long id) {
        return service.getOrderById(id);
    }

    /**
     * POST endpoint to create a new order.
     * 
     * @param order The order object to be created.
     * @return The created order object.
     */
    @PostMapping
    public Orders saveOrder(@RequestBody Orders order) {
        return service.saveOrder(order);
    }

    /**
     * PUT endpoint to update an existing order.
     * 
     * @param id           The ID of the order to update.
     * @param orderDetails The updated order details.
     * @return The updated order object.
     */
    @PutMapping("/{id}")
    public Orders updateOrder(@PathVariable Long id, @RequestBody Orders orderDetails) {
        return service.saveOrder(orderDetails);
    }

    /**
     * DELETE endpoint to delete an order by its ID.
     * 
     * @param id The ID of the order to delete.
     */
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        service.deleteOrder(id);
    }
}
