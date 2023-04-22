package com.jamesaworo.stocky.features.settings.endpoints;

import com.jamesaworo.stocky.features.settings.data.dto.SettingBackupDto;
import com.jamesaworo.stocky.features.settings.data.interactors.setting_backup_restore.ISettingBackupInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@RestController
@RequestMapping(value = "setting-backup")
@RequiredArgsConstructor
public class SettingBackRestoreEndpoints {
    private final ISettingBackupInteractor interactor;

    @GetMapping(value = "all")
    public ResponseEntity<List<SettingBackupDto>> getAll() {
        return interactor.getAll();
    }

    @PostMapping(value = "update-all")
    public ResponseEntity<Optional<Boolean>> updateAll(List<SettingBackupDto> list) {
        return interactor.updateAll(list);
    }

}