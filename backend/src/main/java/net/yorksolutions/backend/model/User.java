package net.yorksolutions.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;

    @JsonProperty
    public String firstName;

    @JsonProperty
    public String lastName;

    @JsonProperty
    public String role;

    @JsonProperty
    public String email;

    @JsonProperty
    public String password;

    @JsonProperty
    // 0-disabled
    //the reason we dont have an auth level for guest is because they ain't logged in, and they are guests, they checkout
    // but we dont save their infomration.
    // 1-customer
    // 2-shopkeeper
    // 3- admin

    public int authLevel = 1;

    @JsonProperty
    public String address1;

    @JsonProperty
    public String address2;

    @JsonProperty
    public String city;

    @JsonProperty
    public String state;

    @JsonProperty
    public String zipcode;


    public User() {
    }

    //register
    public User(String firstName, String lastName, String role, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
        // me and Emeka altered the constructor so that self registered users, are set as customers.
        // their authlevels will be intialized to 2.
        this.authLevel = 1;
    }

    //admin is registering a user to shopkeeper or admin.
    public User(String firstName, String lastName, String role, String email, String password, int authLevel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
        this.authLevel= authLevel;
    }

    public User(Long id, String firstName, String lastName, String role, String email, String password, int authLevel, String address1, String address2, String city, String state, String zipcode) {
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


    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // returns as user logs in
    // THE USEROUTPUT CLASS TOOK THE PLACE OF THIS CONSTRUCTOR.
    // JOHHNY TOOK CARE OF THIS
    // SO BRING THIS UP WITH DATA GROUP TOMMOROW.
//    public User(Long id, String firstName, String lastName, String email, int authLevel) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.authLevel = authLevel;
//    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


}
