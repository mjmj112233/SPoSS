package com.ciit.spossbackend.service;

import com.ciit.spossbackend.model.Product;
import com.ciit.spossbackend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(final ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public List<Product> getAllProductsByName(String name) {
        return repository.findByNameNative(name);
    }

    public List<Product> getAllProductsByCategory(String category) {
        return repository.findByCategoryName(category);
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
