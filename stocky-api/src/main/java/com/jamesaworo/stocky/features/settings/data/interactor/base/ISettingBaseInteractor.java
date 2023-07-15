package com.jamesaworo.stocky.features.settings.data.interactor.base;


import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import com.jamesaworo.stocky.features.settings.domain.enums.SettingModule;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface ISettingBaseInteractor {

    default ResponseEntity<SettingRequest> get(String key, SettingModule module) {
        return new ResponseEntity<>(new SettingRequest(), HttpStatus.OK);
    }

    ResponseEntity<SettingRequest> get(String key);

    ResponseEntity<List<SettingRequest>> getAll();

    ResponseEntity<Boolean> update(SettingRequest dto);

    ResponseEntity<Boolean> updateAll(List<SettingRequest> list);

}