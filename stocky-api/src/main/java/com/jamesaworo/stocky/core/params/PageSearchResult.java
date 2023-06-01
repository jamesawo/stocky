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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageSearchResult<T> {
	private PageParam page;
	private T result;
}