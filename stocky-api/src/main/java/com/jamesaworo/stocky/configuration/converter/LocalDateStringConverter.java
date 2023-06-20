/*
 * @Author: james.junior
 * @Date: 6/20/23 15:51
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.configuration.converter;

import org.springframework.core.convert.converter.Converter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


public class LocalDateStringConverter implements Converter<String, LocalDate> {
	@Override
	public LocalDate convert(String source) {
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDate.parse(source, format);
	}
}
