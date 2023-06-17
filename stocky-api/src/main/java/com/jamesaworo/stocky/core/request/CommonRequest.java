/*
 * @Author: james.junior
 * @Date: 6/16/23 12:59
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonRequest {
	private Long id;
	private String title;
	private String description;
	private Boolean isActiveStatus;
}
