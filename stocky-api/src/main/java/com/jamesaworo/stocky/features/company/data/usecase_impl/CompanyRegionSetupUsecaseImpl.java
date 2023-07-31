/*
 * @Author: james.junior
 * @Date: 6/15/23 01:15
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyRegionDetailRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyRegionDetail;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyRegionSetupUsecase;
import com.jamesaworo.stocky.features.settings.domain.entity.Setting;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanyRegionSetupUsecaseImpl implements ICompanyRegionSetupUsecase {

    private final CompanyRegionDetailRepository repository;

    @Override
    public List<CompanyRegionDetail> all() {
        return this.repository.findAll();
    }

    @Override
    public Optional<CompanyRegionDetail> get(String key) {
        return this.repository.findBySetupKeyEqualsIgnoreCase(key);
    }

    @Override
    public Optional<Boolean> update(String key, String value) {
        Optional<CompanyRegionDetail> optional = this.get(key);
        return optional.map(detail -> {
            int count = this.repository.updateValueWhereKey(value, key);
            return count == 1;
        });
    }

    @Override
    @Transactional
    public void updateMany(List<CompanyRegionDetail> list) {
        list.forEach(basicDetail -> {
            this.update(basicDetail.getSetupKey(), basicDetail.getSetupValue());
        });
    }

    @Override
    public Setting getAsSetting(String key) {
        Optional<CompanyRegionDetail> companyRegionDetail = this.get(key);
        return companyRegionDetail.map(region -> new Setting(region.getSetupKey(), region.getSetupValue())).orElse(new Setting());
    }

    @Override
    public Optional<String> getSettingValue(String key) {
        Optional<CompanyRegionDetail> optionalDetail = this.get(key);
        return optionalDetail.map(CompanyRegionDetail::getSetupValue);
    }
}
