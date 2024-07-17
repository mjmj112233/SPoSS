package com.ciit.spossbackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String customer_uid; // Assuming this is a Firebase user ID

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> orderItems;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column
    private BigDecimal totalAmount;

    /**
     * Calculates the total amount based on the order items.
     * This method is triggered before persisting or updating the entity.
     */
    @PrePersist
    @PreUpdate
    public void calculateTotalAmount() {
        if (orderItems != null) {
            this.totalAmount = orderItems.stream()
                    .map(orderItem -> orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        } else {
            this.totalAmount = BigDecimal.ZERO;
        }
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomer_uid() {
        return customer_uid;
    }

    public void setCustomer_uid(String customer_uid) {
        this.customer_uid = customer_uid;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
