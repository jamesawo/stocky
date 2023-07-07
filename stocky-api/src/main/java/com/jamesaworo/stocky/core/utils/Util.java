/*
 * @Author: james.junior
 * @Date: 7/3/23 18:10
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.utils;

import com.jamesaworo.stocky.configuration.converter.LocalDateStringConverter;

import java.time.LocalDate;

public class Util {

	public static LocalDate convertStringToLocalDate(String date) {
		LocalDateStringConverter converter = new LocalDateStringConverter();
		return converter.convert(date == null ? LocalDate.now().toString() : date);
	}
}
