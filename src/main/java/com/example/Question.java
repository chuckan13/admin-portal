package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "text")
    private String text;
    @Column(name = "team_id")
    private long teamId;
    @Column(name = "word_limit")
    private int wordLimit;

    public int getWordLimit() {
        return this.wordLimit;
    }

    public void setWordLimit(int wordLimit) {
        this.wordLimit = wordLimit;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getTeamId() {
        return this.teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public Long getId() {
        return this.id;
    }

    public void updateParameters(Question other) {
        this.text = other.getText();
        this.teamId = other.getTeamId();
        this.wordLimit = other.getWordLimit();
    }
}