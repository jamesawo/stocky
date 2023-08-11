/*
 * @Author: james.junior
 * @Date: 8/11/23 11:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FileHandlerStatus {
    private Boolean status;
    private Map<String, String> reason;
}
