package com.password_manager.Controller;

import com.password_manager.Entity.Password;
import com.password_manager.Service.PasswordService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/password")
public class PasswordController {

    private final PasswordService passwordService;

    public PasswordController(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Password> passwords() {
        return passwordService.passwordList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Password> findPasswordById(@PathVariable("id") Long id) {
        return ResponseEntity.status(HttpStatus.FOUND).body(passwordService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Password> addPassword(@Valid @RequestBody Password password) {
        return ResponseEntity.status(HttpStatus.CREATED).body(passwordService.addPassword(password));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Password> updatePassword(@Valid @PathVariable("id") Long id, @RequestBody Password password) {
        Password tempPass = passwordService.updatePassword(id, password);
        return ResponseEntity.status(HttpStatus.OK).body(tempPass);

    }

    @DeleteMapping("/{id}")
    public void deletePassword(@PathVariable("id") Long id) {
        passwordService.deletePassword(id);
    }


}
