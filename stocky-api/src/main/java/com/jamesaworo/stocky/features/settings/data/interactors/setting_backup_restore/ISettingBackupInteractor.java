package com.jamesaworo.stocky.features.settings.data.interactors.setting_backup_restore;


import com.jamesaworo.stocky.features.settings.data.dto.SettingBackupDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface ISettingBackupInteractor {

    ResponseEntity<List<SettingBackupDto>> getAll();

    ResponseEntity<Optional<Boolean>> update(SettingBackupDto dto);

    ResponseEntity<Optional<Boolean>> updateAll(List<SettingBackupDto> list);

}