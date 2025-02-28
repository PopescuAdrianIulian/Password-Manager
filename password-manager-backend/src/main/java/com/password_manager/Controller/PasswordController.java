package com.password_manager.Controller;

import com.password_manager.Entity.Password;
import com.password_manager.Entity.User;
import com.password_manager.Service.PasswordService;
import com.password_manager.Service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/password")
public class PasswordController {

    private static final Logger logger = LoggerFactory.getLogger(PasswordController.class);
    private final PasswordService passwordService;
    private final UserService userService;

    public PasswordController(PasswordService passwordService, UserService userService) {
        this.passwordService = passwordService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> passwords(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        logger.info("Fetching passwords from database");
        if (userId == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = userService.findByUsername((String) session.getAttribute("username"));
        List<Password> passwords = passwordService.passwordListByUser(user);
        logger.debug("Fetching successfully");
        return ResponseEntity.ok(passwords);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findPasswordById(@PathVariable("id") Long id, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Password password = passwordService.findById(id);
        if (password.getUser() == null || password.getUser().getId() != userId) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Unauthorized to access this password");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        return ResponseEntity.status(HttpStatus.FOUND).body(password);
    }

    @PostMapping
    public ResponseEntity<?> addPassword(@Valid @RequestBody Password password, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        logger.info("Adding a new password!");
        if (userId == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = userService.findByUsername((String) session.getAttribute("username"));
        password.setUser(user);
        logger.debug("Password added successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(passwordService.addPassword(password));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updatePassword(@Valid @PathVariable("id") Long id, @RequestBody Password password, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        logger.info("Updating password!");
        if (userId == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Not authenticated");
            logger.debug("Password updated successfully");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        Password existingPassword = passwordService.findById(id);
        if (existingPassword.getUser() == null || existingPassword.getUser().getId() != userId) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Unauthorized to update this password");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        Password tempPass = passwordService.updatePassword(id, password);
        logger.debug("Password updated successfully");
        return ResponseEntity.status(HttpStatus.OK).body(tempPass);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePassword(@PathVariable("id") Long id, HttpSession session) {
        logger.info("Deleting a password");
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Password existingPassword = passwordService.findById(id);
        if (existingPassword.getUser() == null || existingPassword.getUser().getId() != userId) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Unauthorized to delete this password");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        passwordService.deletePassword(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password deleted successfully");
        logger.debug("Deleted successfully");
        return ResponseEntity.ok(response);
    }
}
