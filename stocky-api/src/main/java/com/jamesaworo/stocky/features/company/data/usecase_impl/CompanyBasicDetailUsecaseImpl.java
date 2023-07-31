/*
 * @Author: james.junior
 * @Date: 6/15/23 01:15
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyBasicDetailRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyBasicDetail;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBasicDetailUsecase;
import com.jamesaworo.stocky.features.settings.domain.entity.Setting;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanyBasicDetailUsecaseImpl implements ICompanyBasicDetailUsecase {

    private final CompanyBasicDetailRepository repository;

    @Override
    public List<CompanyBasicDetail> all() {
        return this.repository.findAll();
    }

    @Override
    public Optional<CompanyBasicDetail> get(String key) {
        return this.repository.findBySetupKeyEqualsIgnoreCase(key);
    }

    @Override
    public Setting getAsSetting(String key) {
        Optional<CompanyBasicDetail> optional = this.get(key);
        return optional.map(basic -> new Setting(basic.getSetupKey(), basic.getSetupValue())).orElse(new Setting());
    }

    @Override
    public Optional<Boolean> update(String key, String value) {
        Optional<CompanyBasicDetail> optional = this.get(key);
        return optional.map(detail -> {
            int count = this.repository.updateValueWhereKey(value, key);
            return count == 1;
        });
    }

    @Override
    @Transactional
    public void updateMany(List<CompanyBasicDetail> list) {
        list.forEach(basicDetail -> {
            this.update(basicDetail.getSetupKey(), basicDetail.getSetupValue());
        });
    }

    @Override
    public Optional<String> getValue(String key) {
        Optional<CompanyBasicDetail> optional = this.get(key);
        return optional.map(CompanyBasicDetail::getSetupValue);
    }
}
