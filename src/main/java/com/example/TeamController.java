package com.example;

import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    private TeamRepository repository;
    private LoginuserRepository loginRepo;

    @Autowired
    public TeamController(TeamRepository repository, LoginuserRepository loginRepo) {
        this.repository = repository;
        this.loginRepo = loginRepo;
    }

    // @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    // public ResponseEntity<LoanOption> get(@PathVariable("id") Long id) {
    // LoanOption loan = repository.findOne(id);
    // if (null == loan)
    // return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
    // return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    // }

    // @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    // public ResponseEntity<LoanOption> delete(@PathVariable("id") Long id) {
    // LoanOption loan = repository.findOne(id);
    // if (loan == null)
    // return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
    // repository.delete(loan);
    // return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    // }

    // @RequestMapping(value = "/new", method = RequestMethod.POST)
    // public ResponseEntity<LoanOption> update(@RequestBody LoanOption loan) {
    // repository.save(loan);
    // return get(loan.getId());
    // }

    @RequestMapping
    public ResponseEntity<Team> getTeam(Principal principal) {
        Loginuser loginuser = loginRepo.findByUserName(principal.getName());
        return new ResponseEntity<Team>(repository.findOne(loginuser.getId()), HttpStatus.OK);
    }
}