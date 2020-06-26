package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    private QuestionRepository repository;

    @Autowired
    public QuestionController(QuestionRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/teams/{teamId}", method = RequestMethod.GET)
    public List<Question> getByTeamId(@PathVariable("teamId") Long teamId) {
        List<Question> allQuestions = repository.findByTeamId(teamId);
        return allQuestions;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Question> get(@PathVariable("id") Long id) {
        Question question = repository.findOne(id);
        if (null == question)
            return new ResponseEntity<Question>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Question>(question, HttpStatus.OK);
    }

    // @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    // public ResponseEntity<LoanOption> delete(@PathVariable("id") Long id) {
    // LoanOption loan = repository.findOne(id);
    // if (loan == null)
    // return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
    // repository.delete(loan);
    // return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    // }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Question> update(@RequestBody Question question) {
        repository.save(question);
        return get(question.getId());
    }

    @RequestMapping
    public List<Question> all() {
        return repository.findAll();
    }
}