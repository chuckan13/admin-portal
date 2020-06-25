package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;
    @Column(name = "loginuser_id")
    private String loginuserId;

    public String getLoginuserId() {
        return this.loginuserId;
    }

    public void setLoginuserId(String loginuserId) {
        this.loginuserId = loginuserId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return this.id;
    }

    public void updateParameters(Team other) {
        this.name = other.getName();
        this.loginuserId = other.getLoginuserId();
    }
}