/*
 * @Author: james.junior
 * @Date: 8/12/23 15:50
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BiParam<L, R> {
    L left;
    R right;
}
