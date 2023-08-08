/*
 * @Author: james.junior
 * @Date: 8/5/23 19:42
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.configuration.security;

import com.jamesaworo.stocky.core.exceptions.TokenValidationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.apache.commons.lang3.ObjectUtils.isNotEmpty;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_HEADER = "Authorization";
    private final JwtAuthenticationTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;


    public JwtAuthenticationFilter(JwtAuthenticationTokenUtil jwtTokenUtil, UserDetailsService userDetailsService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = extractTokenFromRequest(request);

        if (token != null) {
            try {
                if (jwtTokenUtil.validateToken(token)) {
                    String username = jwtTokenUtil.getUsernameFromToken(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                // response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                throw new TokenValidationException(e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String token = request.getHeader(TOKEN_HEADER);
        if (isNotEmpty(token) && token.startsWith(TOKEN_PREFIX)) {
            return token.substring(TOKEN_PREFIX.length());
        }
        return token;
    }

}

