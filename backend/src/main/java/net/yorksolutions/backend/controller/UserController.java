package net.yorksolutions.backend.controller;

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
    public String role;
    public String email;
    public int authLevel;

    UserOutput(){};

    public UserOutput(Long id, String firstName, String lastName, String role, String email, int authLevel) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
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

//    @CrossOrigin
//    @PostMapping("/login")
//    Object login(@RequestBody User user) {
//        Optional<User> response = userRepo.findByEmail(user.getEmail());
//
//        if (response.isPresent() && response.get().getPassword().equals(user.password)) {
//            User res = response.get();
//            UserOutput foundUser = new UserOutput(res.id, res.firstName, res.lastName, res.email, res.authLevel);
//            return foundUser;
//        } else {
//            return null;
//        }
//    }

    @CrossOrigin
    @PostMapping("/login")
    Object login(@RequestBody User user) {
        Optional<User> response = userRepo.findByEmail(user.email);

        if (response.isPresent() && response.get().password.equals(user.password)) {
            User res = response.get();
            // now we are taking all the information from User that we got from the database, and copying this object information
            // to a new user Output object, that excludes the password.
            // we dont want to send over the password.
            UserOutput foundUser = new UserOutput(res.id, res.firstName, res.lastName, res.role, res.email, res.authLevel);
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

    @CrossOrigin
    //Admin is able to delete a user.
    @DeleteMapping("/delete/{id}")
    String delete(@PathVariable Long id) {
        userRepo.deleteById(id);
        return "success";
    }

//    @CrossOrigin
//    @PutMapping("/edit")
//    User edit(@RequestBody User user) {
//      User response = userRepo.findById(user.getId()).orElseThrow();
//        userRepo.save(user);
//        return userRepo.findById(user.getId()).get();
//
//    }
//    @CrossOrigin
//    @PutMapping("/edit")
//    //returning user, for what?? why are we returning the user????
//    User editTwo(@RequestBody User user) {
//        userRepo.findById(user.getId()).orElseThrow();
//        userRepo.save(user);
//        // the user is already updated in the database, let just return this user from the database
//        return user;
//
//    }

    @CrossOrigin
    @PutMapping("/edit")
    // returning string to notify the front end that the admin successfully edited the user.
    String editThree(@RequestBody User user) {
        userRepo.findById(user.getId()).orElseThrow();
        userRepo.save(user);
        return "success";

    }
}
