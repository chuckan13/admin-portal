package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {
    private ResponseRepository repository;
    private QuestionRepository questRepo;

    @Autowired
    public ResponseController(ResponseRepository repository, QuestionRepository questRepo) {
        this.repository = repository;
        this.questRepo = questRepo;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Response> get(@PathVariable("id") Long id) {
        Response response = repository.findOne(id);
        if (null == response)
            return new ResponseEntity<Response>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/question/{id}", method = RequestMethod.GET)
    public ResponseEntity<Question> getQuestion(@PathVariable("id") Long id) {
        Response currResponse = repository.findOne(id);
        return new ResponseEntity<Question>(questRepo.findOne(currResponse.getQuestionId()), HttpStatus.OK);
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
    public ResponseEntity<Response> update(@RequestBody Response response) {
        repository.save(response);
        return get(response.getId());
    }

    @RequestMapping
    public List<Response> all() {
        return repository.findAll();
    }
}