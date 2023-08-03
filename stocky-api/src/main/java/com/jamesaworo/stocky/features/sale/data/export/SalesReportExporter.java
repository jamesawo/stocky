/*
 * @Author: james.junior
 * @Date: 7/25/23 14:10
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.export;

import com.jamesaworo.stocky.core.params.DataExporter;
import com.jamesaworo.stocky.core.utils.ExportUtil;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyAdministratorSetupUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBasicDetailUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyRegionSetupUsecase;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.CompanyDetailConstant.*;
import static com.jamesaworo.stocky.core.constants.ReportConstant.RECEIPT_FOOTER;
import static com.jamesaworo.stocky.features.sale.data.enums.SaleReportFileEnum.SALE_REPORT;

@Component
@RequiredArgsConstructor
public class SalesReportExporter implements DataExporter<byte[], List<SaleTransaction>> {
    public static final String EMPTY = "";
    private final ICompanyAdministratorSetupUsecase adminUsecase;
    private final ICompanyBasicDetailUsecase basicDetailUsecase;
    private final ICompanyRegionSetupUsecase regionSetupUsecase;

    @Override
    public byte[] export(List<SaleTransaction> data) {
        var list = new ArrayList<>();
        HashMap<String, Object> map = toMap();
        JRDataSource jrDataSource = list.isEmpty() ? new JREmptyDataSource() : new JRBeanCollectionDataSource(list);

        return ExportUtil.generatePDFBytes(map, SALE_REPORT.asInputStream(), jrDataSource);
    }

    private HashMap<String, Object> toMap() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("businessName", this.basicDetailUsecase.getValue(COMPANY_BUSINESS_NAME).orElse(EMPTY));
        map.put("businessAddress", this.basicDetailUsecase.getValue(COMPANY_BUSINESS_ADDRESS).orElse(EMPTY));
        map.put("businessPhone", this.adminUsecase.getValue(COMPANY_PROFILE_PHONE).orElse(EMPTY));
        map.put("businessEmail", this.adminUsecase.getValue(COMPANY_PROFILE_EMAIL).orElse(EMPTY));
        map.put("reportFooter", RECEIPT_FOOTER);
        return map;
    }

    private String currency() {
        Optional<String> settingValue = this.regionSetupUsecase.getSettingValue(COMPANY_REGION_CURRENCY);
        return settingValue.orElse(EMPTY);
    }
}
