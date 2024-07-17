package com.ciit.spossbackend.controller;

import com.ciit.spossbackend.model.Category;
import com.ciit.spossbackend.model.Product;
import com.ciit.spossbackend.service.CategoryService;
import com.ciit.spossbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService service;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return service.getAllProductsByCategory(category);
    }

    @GetMapping("/name/{name}")
    public List<Product> getProductsByName(@PathVariable String name) {
        return service.getAllProductsByName(name);
    }

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
                // Handle IOException
                e.printStackTrace();
                // You might want to throw a custom exception or handle it as appropriate
            }
        }

        return service.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
    }
}
