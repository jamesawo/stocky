package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyRegionDetail;
import com.jamesaworo.stocky.features.settings.domain.entity.Setting;

import java.util.List;
import java.util.Optional;

public interface ICompanyRegionSetupUsecase {

    List<CompanyRegionDetail> all();

    Optional<CompanyRegionDetail> get(String key);

    Optional<Boolean> update(String key, String value);

    void updateMany(List<CompanyRegionDetail> list);

    Setting getAsSetting(String key);

    Optional<String> getSettingValue(String key);

}
