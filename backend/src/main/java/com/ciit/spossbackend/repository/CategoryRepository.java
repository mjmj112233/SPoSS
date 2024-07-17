package com.ciit.spossbackend.repository;

import com.ciit.spossbackend.model.Category;
import com.ciit.spossbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    //Custom query method to find all active products
    List<Category> findByDeletedFalse();


}