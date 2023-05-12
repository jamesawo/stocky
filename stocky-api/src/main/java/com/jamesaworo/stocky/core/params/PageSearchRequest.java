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

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageSearchRequest<T> {
    @NotNull(message = "page payload cannot be null")
    private PageParam page;

    @NotNull(message = "search parameter cannot be null")
    private T searchRequest;
}