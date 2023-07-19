/*
 * @Author: james.junior
 * @Date: 6/18/23 13:41
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.company.domain.enums.CustomerTagEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyCustomerRequest {
    private Long id;
    private String customerFirstName;
    private String customerLastName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private CustomerTagEnum customerTag;
    private Boolean isActiveStatus;
}
