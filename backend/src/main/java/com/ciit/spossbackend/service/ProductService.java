package com.ciit.spossbackend.service;

import com.ciit.spossbackend.model.Product;
import com.ciit.spossbackend.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(final ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * Retrieves all products from the database.
     *
     * @return List of all products.
     */
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    /**
     * Retrieves products by their name using a native query.
     *
     * @param name The name of the products to retrieve.
     * @return List of products with the given name.
     */
    public List<Product> getAllProductsByName(String name) {
        return repository.findByNameNative(name);
    }

    /**
     * Retrieves products by their category name.
     *
     * @param category The category name of the products to retrieve.
     * @return List of products in the given category.
     */
    public List<Product> getAllProductsByCategory(String category) {
        return repository.findByCategoryName(category);
    }

    /**
     * Saves a product.
     *
     * @param product The product to save.
     * @return The saved product.
     */
    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    /**
     * Retrieves a product by its ID.
     *
     * @param id The ID of the product to retrieve.
     * @return The product with the given ID, or null if not found.
     */
    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Soft deletes a product by its ID (sets deleted flag to true).
     *
     * @param id The ID of the product to soft delete.
     */
    public void softDeleteProduct(Long productId) {
        Product product = repository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id " + productId + " not found"));

        product.setDeleted(true); // Set deleted flag to true
        repository.save(product); // Save the updated product
    }
}
