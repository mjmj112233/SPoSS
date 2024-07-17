package com.ciit.spossbackend.repository;

import com.ciit.spossbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryName(String category);

    @Query(value = "SELECT * FROM Product WHERE name = ?1", nativeQuery = true)
    List<Product> findByNameNative(String name);

}
