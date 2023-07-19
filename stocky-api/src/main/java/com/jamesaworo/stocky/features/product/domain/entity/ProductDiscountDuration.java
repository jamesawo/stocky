/*
 * @Author: james.junior
 * @Date: 7/19/23 19:39
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

import static com.jamesaworo.stocky.core.constants.Table.PRODUCT_DISCOUNT;


@Entity
@Table(name = PRODUCT_DISCOUNT)
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDiscountDuration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long priceId;
    private LocalDate startDate;
    private LocalDate endDate;


    public ProductDiscountDuration(Long priceId, LocalDate startDate, LocalDate endDate) {
        this.priceId = priceId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
