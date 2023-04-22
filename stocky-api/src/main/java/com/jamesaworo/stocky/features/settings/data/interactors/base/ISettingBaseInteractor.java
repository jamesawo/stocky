package com.jamesaworo.stocky.features.settings.data.interactors.base;


import com.jamesaworo.stocky.features.settings.data.dto.SettingDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface ISettingBaseInteractor {

    ResponseEntity<SettingDto> get(String key);

    ResponseEntity<List<SettingDto>> getAll();

    ResponseEntity<Boolean> update(SettingDto dto);

    ResponseEntity<Boolean> updateAll(List<SettingDto> list);

}