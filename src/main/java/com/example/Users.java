package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "token")
    public String token;
    @Column(name = "first_name")
    public String firstName;
    @Column(name = "last_name")
    public String lastName;
    @Column(name = "email")
    public String email;
    @Column(name = "class_year")
    public String classYear;
    @Column(name = "concentration")
    public String concentration;
    @Column(name = "role")
    public String role;

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getClassYear() {
        return this.classYear;
    }

    public void setClassYear(String classYear) {
        this.classYear = classYear;
    }

    public String getConcentration() {
        return this.concentration;
    }

    public void setConcentration(String concentration) {
        this.concentration = concentration;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getId() {
        return this.id;
    }

    public void updateParameters(Users other) {
        this.token = other.getToken();
        this.firstName = other.getFirstName();
        this.lastName = other.getLastName();
        this.email = other.getEmail();
        this.classYear = other.getClassYear();
        this.concentration = other.getConcentration();
        this.role = other.getRole();
    }
}