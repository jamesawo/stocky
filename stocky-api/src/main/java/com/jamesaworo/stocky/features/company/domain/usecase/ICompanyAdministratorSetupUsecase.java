package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyAdministratorDetail;
import com.jamesaworo.stocky.features.settings.domain.entity.Setting;

import java.util.List;
import java.util.Optional;

public interface ICompanyAdministratorSetupUsecase {

    List<CompanyAdministratorDetail> all();

    Optional<CompanyAdministratorDetail> get(String key);

    Setting getAsSetting(String key);

    Optional<Boolean> update(String key, String value);

    void updateMany(List<CompanyAdministratorDetail> list);

    Optional<String> getValue(String key);
}
