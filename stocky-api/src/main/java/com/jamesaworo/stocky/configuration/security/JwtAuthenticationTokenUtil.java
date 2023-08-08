/*
 * @Author: james.junior
 * @Date: 8/5/23 19:41
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.configuration.security;

import com.jamesaworo.stocky.core.exceptions.TokenValidationException;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationTokenUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    @Value("${jwt.issuer}")
    private String issuer;

    public String getSecret() {
        return secret;
    }

    public long getExpirationMs() {
        return expirationMs;
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setClaims(claimsMap(user))
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + this.getExpirationMs()))
                //.signWith(SignatureAlgorithm.HS512, this.getSecret().getBytes(UTF_8))
                .signWith(this.key())
                .setIssuer(issuer)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(this.key())
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(this.key())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }

    private boolean isTokenDateExpired(Date expirationDate) {
        return expirationDate.before(new Date());
    }

    private boolean isValidClaim(Claims claims) {
        return claims.containsKey("user");
    }

    private boolean isValidClaimIssurer(String claimsIssuer) {
        return claimsIssuer != null && claimsIssuer.equals(issuer);
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(this.key()).parseClaimsJws(token);
            Claims claims = claimsJws.getBody();
            String claimsIssuer = claims.getIssuer();
            Date expirationDate = claims.getExpiration();

            if (isTokenDateExpired(expirationDate)) {
                throw new TokenValidationException("Token expired");
            } else if (!isValidClaimIssurer(claimsIssuer)) {
                throw new TokenValidationException("Invalid claim issurer provided");
            } else if (!isValidClaim(claims)) {
                throw new TokenValidationException("Invalid token claim");
            }
            return true;
        } catch (ExpiredJwtException ex) {
            // Token has expired
            log.error("JWT Token expired", ex);
            throw new TokenValidationException(ex.getMessage());
        } catch (JwtException ex) {
            // Token validation failed for other reasons (e.g., invalid signature)
            log.error("JWT Token validation failed", ex);
            throw new TokenValidationException(ex.getMessage());
        }
    }

    private Map<String, Object> claimsMap(User user) {
        Map<String, Object> map = new HashMap<>();
        map.put("user", user.getId());
        return map;
    }

    private Key key() {
        return Keys.hmacShaKeyFor(this.secret.getBytes(StandardCharsets.UTF_8));
    }
}
