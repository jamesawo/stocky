package com.jamesaworo.stocky.features.settings.endpoints;

import com.jamesaworo.stocky.features.settings.data.dto.SettingDto;
import com.jamesaworo.stocky.features.settings.data.interactors.setting_expenses.ISettingExpensesInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@RestController
@RequestMapping(value = "setting-expenses")
@RequiredArgsConstructor
public class SettingExpensesEndpoint {
    private final ISettingExpensesInteractor interactor;

    @GetMapping()
    public ResponseEntity<SettingDto> get(@RequestParam() String key) {
        return this.interactor.get(key);
    }

    @GetMapping(value = "all")
    public ResponseEntity<List<SettingDto>> getAll() {
        return interactor.getAll();
    }

    @PostMapping(value = "update-all")
    public ResponseEntity<Boolean> updateAll(@RequestBody List<SettingDto> list) {
        return interactor.updateAll(list);
    }

    @PutMapping(value = "update")
    public ResponseEntity<Boolean> update(@RequestBody SettingDto setting) {
        return interactor.update(setting);
    }

}