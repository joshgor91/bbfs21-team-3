package net.yorksolutions.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.yorksolutions.backend.model.Cart;
import net.yorksolutions.backend.model.User;
import net.yorksolutions.backend.repository.CartRepository;
import net.yorksolutions.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

class UserOutput {
    public Long id;
    public String firstName;
    public String lastName;
    public String role;
    public String email;
    public String password;
    public int authLevel;
    public String address1;
    public String address2;
    public String city;
    public String state;
    public String zipcode;



    UserOutput(){};

    public UserOutput(Long id, String firstName, String lastName, String role, String email, String password, int authLevel, String address1, String address2, String city, String state, String zipcode) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
        this.authLevel = authLevel;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepo;

    @Autowired
    CartRepository cartRepo;


    @CrossOrigin
    // for admin, to get all users
    @GetMapping("/all")
    Iterable<User> all() {
        return userRepo.findAll();
    }


    @CrossOrigin
    @PostMapping("/login")
    Object login(@RequestBody User user) {
        Optional<User> response = userRepo.findByEmail(user.email);

        if (response.isPresent() && response.get().password.equals(user.password)) {
            User res = response.get();
            UserOutput foundUser = new UserOutput(res.id, res.firstName, res.lastName, res.role, res.email, res.password, res.authLevel,res.address1,res.address2,res.city,res.state, res.zipcode);

            return foundUser;
        } else {
            HashMap<String, String> res = new HashMap<>();
            res.put("message", "user does not exist");
            return res;
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
        //create cart object
        Cart cart = new Cart(newUser.id);
//        if (cartRepo.findByUserId(newUser.id).isEmpty())
//        save cart
        cartRepo.save(cart);

        return "success";
    }

    @CrossOrigin
    //Admin is able to delete a user.
    @DeleteMapping("/delete/{id}")
    String delete(@PathVariable Long id) {
        userRepo.deleteById(id);
        return "success";
    }


//    ObjectMapper objectMapper = new ObjectMapper();

    @CrossOrigin
    @PutMapping("/edit")
    // returning string to notify the front end that the admin successfully edited the user.
    String editThree(@RequestBody User userToEdit) throws JsonProcessingException {
//        System.out.println(objectMapper.writeValueAsString(user));
        var user = userRepo.findById(userToEdit.getId());
        if (user.isPresent() && !user.get().email.equals(userToEdit.email))
            return "email already exists";
        userRepo.save(userToEdit);
        return "success";
    }
}
