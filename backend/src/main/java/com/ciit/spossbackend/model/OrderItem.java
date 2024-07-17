package com.ciit.spossbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable=false)
    @JsonBackReference
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable=false)
    private Product product;

    @Column
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    @PrePersist
    @PreUpdate
    public void calculatePrice() {
        if (product != null && quantity != null) {
            this.price = product.getPrice().multiply(BigDecimal.valueOf(quantity));
        }
    }

    //getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
