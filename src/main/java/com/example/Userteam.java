package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Userteam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "team_id")
    private long teamId;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "preference")
    private int preference;

    public Long getTeamId() {
        return this.teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getPreference() {
        return this.preference;
    }

    public void setPreference(Integer preference) {
        this.preference = preference;
    }

    public Long getId() {
        return this.id;
    }

    public void updateParameters(Userteam other) {
        this.teamId = other.getTeamId();
        this.userId = other.getUserId();
        this.preference = other.getPreference();
    }
}