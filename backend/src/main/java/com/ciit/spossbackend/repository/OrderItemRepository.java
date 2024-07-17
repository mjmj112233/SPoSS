package com.ciit.spossbackend.repository;

import com.ciit.spossbackend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>  {
}
