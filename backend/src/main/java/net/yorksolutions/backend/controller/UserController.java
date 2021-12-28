package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.backend.model.User;
import net.yorksolutions.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

class UserOutput {
    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public int authLevel;

    UserOutput(){};

    public UserOutput(Long id, String firstName, String lastName, String email, int authLevel) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.authLevel = authLevel;
    }
}

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
    Object login(@RequestBody User user) {
        Optional<User> response = userRepo.findByEmail(user.getEmail());

        if (response.isPresent() && response.get().getPassword().equals(user.password)) {
            User res = response.get();
            UserOutput foundUser = new UserOutput(res.id, res.firstName, res.lastName, res.email, res.authLevel);
            return foundUser;
        } else {
            return null;
        }
    }

    @CrossOrigin
    @PostMapping("/register")
    String registerUser(@RequestBody User newUser) {
        Optional<User> users = userRepo.findByEmail(newUser.getEmail());
        if (users.isPresent()) {
            return "failure";
        }
        userRepo.save(newUser);
        return "success";
    }

}
