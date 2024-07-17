package com.ciit.spossbackend.service;

import com.ciit.spossbackend.model.Category;
import com.ciit.spossbackend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Retrieves all categories from the database.
     *
     * @return List of all categories.
     */
    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    /**
     * Retrieves a category by its ID.
     *
     * @param id The ID of the category to retrieve.
     * @return The category with the given ID, or null if not found.
     */
    public Category getCategoryById(Long id) {
        return repository.findById(id).orElse(null);
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
     * Deletes a category by its ID.
     *
     * @param id The ID of the category to delete.
     */
    public void deleteCategoryById(Long id) {
        repository.deleteById(id);
    }
}
