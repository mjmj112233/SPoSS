package com.ciit.spossbackend.controller;

import com.ciit.spossbackend.model.Category;
import com.ciit.spossbackend.model.Product;
import com.ciit.spossbackend.service.CategoryService;
import com.ciit.spossbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

/**
 * Controller class for handling Product-related API endpoints.
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @Autowired
    private CategoryService categoryService;

    /**
     * GET endpoint to retrieve all products.
     * 
     * @return List of all products.
     */
    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    /**
     * GET endpoint to retrieve a product by its ID.
     * 
     * @param id The ID of the product to retrieve.
     * @return The product with the specified ID.
     */
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }

    /**
     * GET endpoint to retrieve products by category.
     * 
     * @param category The category of products to retrieve.
     * @return List of products belonging to the specified category.
     */
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return service.getAllProductsByCategory(category);
    }

    /**
     * GET endpoint to retrieve products by name.
     * 
     * @param name The name of products to retrieve.
     * @return List of products with the specified name.
     */
    @GetMapping("/name/{name}")
    public List<Product> getProductsByName(@PathVariable String name) {
        return service.getAllProductsByName(name);
    }

    /**
     * POST endpoint to create a new product.
     * 
     * @param name       The name of the product.
     * @param categoryId The ID of the category the product belongs to.
     * @param price      The price of the product.
     * @param image      Optional parameter for the image file of the product.
     * @return The created product object.
     */
    @PostMapping
    public Product saveProduct(@RequestParam("name") String name,
            @RequestParam("category") Long categoryId,
            @RequestParam("price") BigDecimal price,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setCategory(categoryService.getCategoryById(categoryId));
            product.setPrice(price);

            if (image != null && !image.isEmpty()) {
                product.setImage(image.getBytes());
            }

            return service.saveProduct(product);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    /**
     * PUT endpoint to update an existing product.
     * 
     * @param id         The ID of the product to update.
     * @param name       Optional parameter for updating the name of the product.
     * @param categoryId Optional parameter for updating the category of the
     *                   product.
     * @param price      Optional parameter for updating the price of the product.
     * @param image      Optional parameter for updating the image of the product.
     * @return The updated product object.
     */
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "category", required = false) Long categoryId,
            @RequestParam(value = "price", required = false) BigDecimal price,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        Product product = service.getProductById(id);

        if (name != null) {
            product.setName(name);
        }
        if (categoryId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            product.setCategory(category);
        }
        if (price != null) {
            product.setPrice(price);
        }
        if (image != null && !image.isEmpty()) {
            try {
                product.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return service.saveProduct(product);
    }

    /**
     * DELETE endpoint to delete a product by its ID.
     * 
     * @param id The ID of the product to delete.
     */
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
    }
}
