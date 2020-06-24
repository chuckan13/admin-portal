package com.example;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import javax.servlet.ServletException;
import java.util.Map;
import java.util.Collection;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    public CustomAuthenticationSuccessHandler() {
        super();
    }

    @Override
    public void onAuthenticationSuccess(final HttpServletRequest request, final HttpServletResponse response,
            final Authentication authentication) throws IOException {
        // System.out.println("IN SUCESS");
        request.getSession().setMaxInactiveInterval(60 * 60);
        handle(request, response, authentication);
        clearAuthenticationAttributes(request);
    }

    protected void clearAuthenticationAttributes(final HttpServletRequest request) {
        final HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }

    protected String determineTargetUrl(final Authentication authentication) {

        final Map<String, String> roleTargetUrlMap = new HashMap<>();
        roleTargetUrlMap.put("ROLE_USER", "/dashboard");
        return roleTargetUrlMap.get("ROLE_USER");
        // final Collection<? extends GrantedAuthority> authorities =
        // authentication.getAuthorities();
        // for (final GrantedAuthority grantedAuthority : authorities) {
        // final String authorityName = grantedAuthority.getAuthority();
        // if (roleTargetUrlMap.containsKey(authorityName)) {
        // return roleTargetUrlMap.get(authorityName);
        // }
        // }

        // throw new IllegalStateException();
    }

    protected void handle(final HttpServletRequest request, final HttpServletResponse response,
            final Authentication authentication) throws IOException {

        final String targetUrl = determineTargetUrl(authentication);
        // System.out.println("Target url" + targetUrl);
        if (response.isCommitted()) {
            System.out.println("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
        // System.out.println(" IN HANDLE");
        redirectStrategy.sendRedirect(request, response, targetUrl);
    }
}