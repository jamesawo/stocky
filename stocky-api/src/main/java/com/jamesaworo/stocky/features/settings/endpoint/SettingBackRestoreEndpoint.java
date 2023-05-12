package com.jamesaworo.stocky.features.settings.endpoint;

import com.jamesaworo.stocky.features.settings.data.dto.SettingDto;
import com.jamesaworo.stocky.features.settings.data.interactor.setting_backup_restore.ISettingBackupInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@RestController
@RequestMapping(value = API_PREFIX + "/setting-backup")
@RequiredArgsConstructor
public class SettingBackRestoreEndpoint {
    private final ISettingBackupInteractor interactor;

    @GetMapping()
    public ResponseEntity<SettingDto> get(@RequestParam() String key) {
        return this.interactor.get(key);
    }

    @GetMapping(value = "all")
    public ResponseEntity<List<SettingDto>> getAll() {
        return interactor.getAll();
    }

    @PostMapping(value = "update-all")
    public ResponseEntity<Boolean> updateAll(
            @RequestBody List<SettingDto> list
    ) {
        return interactor.updateAll(list);
    }

    @PutMapping(value = "update")
    public ResponseEntity<Boolean> update(
            @RequestBody SettingDto setting) {
        return interactor.update(setting);
    }

}