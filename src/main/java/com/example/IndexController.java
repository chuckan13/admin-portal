package com.example;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
    @RequestMapping(value = "/{path:[^\\.]*}") //
    public String index(Map<String, Object> model) {
        return "index.html";
    }
    // @RequestMapping("/")
    // @ResponseBody
    // public String home() {
    // return "Welcome to home page";
    // }

    // @RequestMapping("/login")
    // public String loginPage(Map<String, Object> model) {
    // return "login.js";
    // }

    // @RequestMapping("/logout-success")
    // public String logoutPage(Map<String, Object> model) {
    // return "logout";
    // }

}