package com.example;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private UsersRepository repository;
    private UserteamRepository userTeamRepo;
    private TeamRepository teamRepo;
    private ResponseRepository respRepo;
    private LoginuserRepository loginRepo;
    private QuestionRepository questRepo;

    @Autowired
    public UsersController(UsersRepository repository, UserteamRepository userTeamRepo, TeamRepository teamRepo,
            ResponseRepository respRepo, LoginuserRepository loginRepo, QuestionRepository questRepo) {
        this.repository = repository;
        this.userTeamRepo = userTeamRepo;
        this.teamRepo = teamRepo;
        this.respRepo = respRepo;
        this.loginRepo = loginRepo;
        this.questRepo = questRepo;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Users> get(@PathVariable("id") Long id) {
        Users user = repository.findOne(id);
        if (null == user)
            return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Users>(user, HttpStatus.OK);
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

    @RequestMapping(value = "/teams/{id}", method = RequestMethod.GET)
    public List<Team> getAllTeams(@PathVariable("id") Long id) {
        List<Userteam> userTeams = userTeamRepo.findByUserIdOrderByPreferenceAsc(id);
        List<Long> teamIds = new ArrayList<Long>();
        List<Team> teams = new ArrayList<Team>();
        for (Userteam userTeam : userTeams) {
            teamIds.add(userTeam.getTeamId());
        }
        for (Long teamId : teamIds) {
            teams.add(teamRepo.findOne(teamId));
        }
        return teams;
    }

    @RequestMapping(value = "/responses/{id}", method = RequestMethod.GET)
    public List<Response> getAllResponses(@PathVariable("id") Long id, Principal principal) {
        Loginuser loginuser = loginRepo.findByUserName(principal.getName());
        Team currTeam = teamRepo.findOne(loginuser.getId());
        List<Response> allResp = respRepo.findByUserId(id);
        List<Response> currResp = new ArrayList<Response>();
        for (Response resp : allResp) {
            Question currQuestion = questRepo.findOne(resp.getQuestionId());
            if (currQuestion.getTeamId() == currTeam.getId()) {
                currResp.add(resp);
            }
        }

        return currResp;
    }

    @RequestMapping
    public List<Users> all(Principal principal) {
        String loggedin = principal.getName();
        Loginuser loginuser = loginRepo.findByUserName(loggedin);
        Team team = teamRepo.findOne(loginuser.getId());
        List<Userteam> userTeams = userTeamRepo.findByTeamId(team.getId());
        List<Long> userIds = new ArrayList<Long>();
        List<Users> users = new ArrayList<Users>();
        for (Userteam userTeam : userTeams) {
            userIds.add(userTeam.getUserId());
        }
        for (Long userId : userIds) {
            users.add(repository.findOne(userId));
        }

        return users;
    }
}