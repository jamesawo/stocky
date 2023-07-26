/*
 * @Author: james.junior
 * @Date: 7/25/23 14:10
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.export;

import com.jamesaworo.stocky.core.params.DataExporter;
import com.jamesaworo.stocky.core.utils.ExportUtil;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import net.sf.jasperreports.engine.JREmptyDataSource;
import org.springframework.stereotype.Component;

import java.util.HashMap;

import static com.jamesaworo.stocky.features.sale.data.enums.SaleReportFileEnum.SALE_RECEIPT;

@Component
public class SalesReportExporter implements DataExporter<byte[], SaleTransaction> {
    public static final String EMPTY = "";

    @Override
    public byte[] export(SaleTransaction data) {
        HashMap<String, Object> map = toMap(data);
        return ExportUtil.generatePDFBytes(map, SALE_RECEIPT.asInputStream(), new JREmptyDataSource());
    }

    private HashMap<String, Object> toMap(SaleTransaction data) {
        HashMap<String, Object> map = new HashMap<>();

        //map.put( "amountPaid", HelperUtil.formatAmount( data.getAmount().doubleValue() ) );
        return map;
    }
}
