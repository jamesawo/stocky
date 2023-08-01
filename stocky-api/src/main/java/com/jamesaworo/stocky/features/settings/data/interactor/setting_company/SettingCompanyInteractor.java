package com.jamesaworo.stocky.features.settings.data.interactor.setting_company;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyAdministratorSetupUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBasicDetailUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyRegionSetupUsecase;
import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.CompanyDetailConstant.*;
import static com.jamesaworo.stocky.features.settings.domain.enums.SettingModule.COMPANY;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.ObjectUtils.isEmpty;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Interactor
@RequiredArgsConstructor
public class SettingCompanyInteractor implements ISettingCompanyInteractor {

    private final ICompanyBasicDetailUsecase basicDetails;
    private final ICompanyRegionSetupUsecase regionUsecase;
    private final ICompanyAdministratorSetupUsecase administratorSetupUsecase;

    @Override
    public ResponseEntity<SettingRequest> get(String key) {
        SettingRequest request = this.findIfKeyContains(key);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<SettingRequest>> getAll() {
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Boolean> update(SettingRequest dto) {
        if (dto.getSettingModule().equals(COMPANY)) {
            Optional<Boolean> optionalBoolean = this.updateIfKeyContains(dto);
            return ok().body(optionalBoolean.orElse(false));
        }
        return ok().body(false);
    }

    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingRequest> list) {
        return null;
    }

    private SettingRequest findIfKeyContains(String key) {
        if (key.contains(COMPANY_REGION)) {
            return SettingRequest.fromModel(this.regionUsecase.getAsSetting(key));
        } else if (key.contains(COMPANY_PROFILE)) {
            return SettingRequest.fromModel(this.administratorSetupUsecase.getAsSetting(key));
        } else if (key.contains(COMPANY_BUSINESS)) {
            return SettingRequest.fromModel(this.basicDetails.getAsSetting(key));
        } else {
            return new SettingRequest();
        }
    }

    private Optional<Boolean> updateIfKeyContains(SettingRequest request) {

        String settingKey = request.getSettingKey();
        String settingValue = request.getSettingValue();

        if (!isEmpty(settingKey) && settingKey.contains(COMPANY_REGION)) {
            return this.regionUsecase.update(settingKey, settingValue);

        } else if (!isEmpty(settingKey) && settingKey.contains(COMPANY_PROFILE)) {
            return this.administratorSetupUsecase.update(settingKey, settingValue);

        } else if (!isEmpty(settingKey) && settingKey.contains(COMPANY_BUSINESS)) {
            return this.basicDetails.update(settingKey, settingValue);

        } else {
            return Optional.empty();
        }
    }

}