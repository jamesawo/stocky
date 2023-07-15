package com.jamesaworo.stocky.features.settings.data.interactor.setting_company;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyAdministratorSetupUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyRegionSetupUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanySetupUsecase;
import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Interactor
@RequiredArgsConstructor
public class SettingCompanyInteractor implements ISettingCompanyInteractor {

    private final ICompanySetupUsecase basicDetails;
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
        return null;
    }

    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingRequest> list) {
        return null;
    }

    private SettingRequest findIfKeyContains(String key) {
        if (key.contains("region")) {
            return SettingRequest.fromModel(this.regionUsecase.getAsSetting(key));
        } else if (key.contains("profile")) {
            return SettingRequest.fromModel(this.administratorSetupUsecase.getAsSetting(key));
        } else if (key.contains("basic")) {
            return SettingRequest.fromModel(this.basicDetails.getAsSetting(key));
        } else {
            return new SettingRequest();
        }
    }

}