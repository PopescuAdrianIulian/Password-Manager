package com.password_manager.Service;

import com.password_manager.Entity.Password;
import com.password_manager.Repository.PasswordRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service


public class PasswordService {
    private final PasswordRepository passwordRepository;

    public PasswordService(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }


    @Transactional
    public Password addPassword(Password password) {
        return passwordRepository.save(password);
    }

    public List<Password> passwordList() {
        return passwordRepository.findAll();
    }

    public Password findById(long id) {
        return passwordRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Id not found"));
    }

    @Transactional
    public Password updatePassword(Long id, Password password) {
        Password tempPass = passwordRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Id not found"));
        tempPass.setPassword(password.getPassword());
        tempPass.setUsername(password.getUsername());
        tempPass.setWebsiteUrl(password.getWebsiteUrl());
        return passwordRepository.save(tempPass);
    }

    @Transactional
    public void deletePassword(Long id) {
        passwordRepository.deleteById(id);
    }

}
