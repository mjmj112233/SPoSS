package com.ciit.spossbackend.controller;

import com.ciit.spossbackend.model.Product;
import com.ciit.spossbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService service;

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
    public Product saveProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = service.getProductById(id);

        if (productDetails.getName()!=null) product.setName(productDetails.getName());
        if (productDetails.getCategory()!=null) product.setCategory(productDetails.getCategory());
        if (productDetails.getPrice()!=null) product.setPrice(productDetails.getPrice());
        if (productDetails.getImage()!=null) product.setImage(productDetails.getImage());

        return service.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
    }
}
