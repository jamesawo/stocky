/*
 * @Author: james.junior
 * @Date: 9/29/22 7:15 PM
 *
 * @Project: paymed-V1
 */

package com.jamesaworo.stocky.core.params;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageResult<T> {
	private PageParam page;
	private List<T> result;
}