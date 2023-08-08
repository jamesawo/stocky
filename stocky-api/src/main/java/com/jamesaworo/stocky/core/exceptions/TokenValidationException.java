/*
 * @Author: james.junior
 * @Date: 8/8/23 00:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.exceptions;

public class TokenValidationException extends RuntimeException {

    public TokenValidationException(String message) {
        super(message);
    }

    public TokenValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}