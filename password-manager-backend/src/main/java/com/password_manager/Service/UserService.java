package com.password_manager.Service;

import com.password_manager.Entity.User;
import com.password_manager.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public boolean validateUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user == null) {
            return false;
        }

        return user.getPassword().equals(password);
    }
}