package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private UsersRepository repository;

    @Autowired
    public UsersController(UsersRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Users> get(@PathVariable("id") Long id) {
        Users loan = repository.findOne(id);
        if (null == loan)
            return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Users>(loan, HttpStatus.OK);
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
    public ResponseEntity<Users> update(@RequestBody Users loan) {
        repository.save(loan);
        return get(loan.getId());
        // add save to userteams too
    }

    @RequestMapping
    public List<Users> all() {
        return repository.findAll();
    }
}