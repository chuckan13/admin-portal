package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "text")
    private String text;
    @Column(name = "question_id")
    private long questionId;

    @Column(name = "user_id")
    private long userId;

    public Long getQuestionId() {
        return this.questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getId() {
        return this.id;
    }

    public void updateParameters(Response other) {
        this.text = other.getText();
        this.questionId = other.getQuestionId();
        this.userId = other.getUserId();
    }
}