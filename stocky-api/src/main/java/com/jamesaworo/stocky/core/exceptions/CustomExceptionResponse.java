package com.jamesaworo.stocky.core.exceptions;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@JsonPropertyOrder({"code", "status", "error"})
@ToString
public class CustomExceptionResponse {

	private HttpStatus status;
	private List<String> error;
	private int code;
	private String message;

	public static final String ERROR_OCCURRED = "An error occurred";


	public CustomExceptionResponse(HttpStatus status, List<String> error, int code) {
		this.status = status;
		this.error = error;
		this.code = code;
		this.message = ERROR_OCCURRED;
	}

	public CustomExceptionResponse(HttpStatus status, List<String> error, int code, String message) {
		this.status = status;
		this.error = error;
		this.code = code;
		this.message = message == null ? ERROR_OCCURRED : message;
	}
}