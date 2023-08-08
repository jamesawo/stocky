package com.jamesaworo.stocky.configuration.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(
            HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
            throws IOException, ServletException {
        logger.error("Responding with unauthorized error. Message - {}", e.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(value = {AccessDeniedException.class})
    public void commence(
            HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                "Authorization Failed : " + accessDeniedException.getMessage());
    }

}
