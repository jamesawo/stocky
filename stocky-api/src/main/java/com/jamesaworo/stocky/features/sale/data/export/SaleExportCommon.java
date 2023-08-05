/*
 * @Author: james.junior
 * @Date: 8/3/23 11:37
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.export;

import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyAdministratorSetupUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBasicDetailUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyRegionSetupUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.CompanyDetailConstant.*;
import static com.jamesaworo.stocky.core.constants.ReportConstant.RECEIPT_FOOTER;

@Component
@RequiredArgsConstructor
public class SaleExportCommon {

    public static final String EMPTY = "";
    private final ICompanyAdministratorSetupUsecase adminUsecase;
    private final ICompanyBasicDetailUsecase basicDetailUsecase;
    private final ICompanyRegionSetupUsecase regionSetupUsecase;

    public HashMap<String, Object> toMap() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("businessName", this.basicDetailUsecase.getValue(COMPANY_BUSINESS_NAME).orElse(EMPTY));
        map.put("businessAddress", this.basicDetailUsecase.getValue(COMPANY_BUSINESS_ADDRESS).orElse(EMPTY));
        map.put("businessPhone", this.adminUsecase.getValue(COMPANY_PROFILE_PHONE).orElse(EMPTY));
        map.put("businessEmail", this.adminUsecase.getValue(COMPANY_PROFILE_EMAIL).orElse(EMPTY));
        map.put("reportFooter", RECEIPT_FOOTER);
        return map;
    }

    public String currency() {
        Optional<String> settingValue = this.regionSetupUsecase.getSettingValue(COMPANY_REGION_CURRENCY);
        return settingValue.orElse(EMPTY);
    }
}
