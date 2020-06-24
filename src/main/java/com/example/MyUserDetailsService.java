package com.example;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import static java.util.Collections.emptyList;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private LoginuserRepository repo;

    public MyUserDetailsService(LoginuserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Loginuser user = repo.findByUserName(username);
        // System.out.println(username);
        if (user == null)
            throw new UsernameNotFoundException(username);

        return new User(user.getUserName(), user.getPassword(), emptyList());
    }
}