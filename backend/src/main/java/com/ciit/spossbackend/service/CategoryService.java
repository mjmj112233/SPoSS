package com.ciit.spossbackend.service;

import com.ciit.spossbackend.model.Category;
import com.ciit.spossbackend.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Retrieves all categories (excluding deleted ones) from the database.
     *
     * @return List of all categories.
     */
    public List<Category> getAllCategories() {
        return repository.findByDeletedFalse();
    }

    /**
     * Retrieves a category by its ID.
     *
     * @param id The ID of the category to retrieve.
     * @return The category with the given ID, or null if not found.
     */
    public Category getCategoryById(Long id) {
        return repository.findById(id)
                .orElse(null);
    }

    /**
     * Saves or updates a category.
     *
     * @param category The category to save or update.
     * @return The saved category.
     */
    public Category saveCategory(Category category) {
        return repository.save(category);
    }

    /**
     * Soft deletes a category by its ID (sets deleted flag to true).
     *
     * @param id The ID of the category to soft delete.
     */
    public void softDeleteCategory(Long id) {
        Category category = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category with id " + id + " not found"));
        category.setDeleted(true); // Set deleted flag to true
        repository.save(category); // Save the updated category
    }
}
