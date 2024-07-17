package com.ciit.spossbackend.controller;

import com.ciit.spossbackend.model.Category;
import com.ciit.spossbackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;

    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    /**
     * GET endpoint to retrieve all categories.
     *
     * @return List of all categories.
     */
    @GetMapping
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }

    /**
     * GET endpoint to retrieve a category by its ID.
     *
     * @param id The ID of the category to retrieve.
     * @return The category with the specified ID.
     */
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return service.getCategoryById(id);
    }

    /**
     * POST endpoint to create a new category.
     *
     * @param category The category object to be created.
     * @return The created category object.
     */
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return service.saveCategory(category);
    }

    /**
     * PUT endpoint to update an existing category.
     *
     * @param id              The ID of the category to update.
     * @param categoryDetails The updated category details.
     * @return The updated category object.
     */
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category category = service.getCategoryById(id);
        if (categoryDetails.getName() != null) {
            category.setName(categoryDetails.getName());
        }
        return service.saveCategory(category);
    }

    /**
     * Soft deletes a category by its ID.
     *
     * @param id The ID of the category to soft delete.
     */
    @DeleteMapping("/{id}")
    public void softDeleteCategory(@PathVariable Long id) {
        service.softDeleteCategory(id);
    }
}
