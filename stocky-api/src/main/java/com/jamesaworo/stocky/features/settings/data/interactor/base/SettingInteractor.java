/*
 * @Author: james.junior
 * @Date: 7/14/23 10:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.settings.data.interactor.base;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import com.jamesaworo.stocky.features.settings.domain.enums.SettingModule;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Interactor
@RequiredArgsConstructor
public class SettingInteractor implements ISettingBaseInteractor {

    private final ApplicationContext context;


    @Override
    public ResponseEntity<SettingRequest> get(String key, SettingModule module) {
        ISettingBaseInteractor interactor = module.interactor(context);
        return interactor.get(key);
    }

    @Override
    public ResponseEntity<SettingRequest> get(String key) {
        return null;
    }

    @Override
    public ResponseEntity<List<SettingRequest>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> update(SettingRequest dto) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingRequest> list) {
        return null;
    }
}
