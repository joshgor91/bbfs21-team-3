package net.yorksolutions.backend.controller;

import net.yorksolutions.backend.model.User;
import net.yorksolutions.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepo;

    @CrossOrigin
    // for admin, to get all users
    @GetMapping("/all")
    Iterable<User> all() {
        return userRepo.findAll();
    }

    @CrossOrigin
    @PostMapping("/login")
    String login(@RequestBody User user) {
        Optional<User> response = userRepo.findByEmail(user.getEmail());
        String loginStatus = "";
        if (!response.isEmpty() &&  response.get().getPassword().equals(user.password)) {
            loginStatus = "success";
        } else {
            loginStatus = "failure";

        }
        return loginStatus;
    }

}
