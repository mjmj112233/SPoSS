package com.ciit.spossbackend.repository;

import com.ciit.spossbackend.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long>  {
}
