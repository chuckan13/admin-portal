package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userteams")
public class UserteamController {
    private UserteamRepository repository;

    @Autowired
    public UserteamController(UserteamRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Userteam> get(@PathVariable("id") Long id) {
        Userteam userteam = repository.findOne(id);
        if (null == userteam)
            return new ResponseEntity<Userteam>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Userteam>(userteam, HttpStatus.OK);
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
    public ResponseEntity<Userteam> update(@RequestBody Userteam userteam) {
        repository.save(userteam);
        return get(userteam.getId());
    }

    @RequestMapping
    public List<Userteam> all() {
        return repository.findAll();
    }
}