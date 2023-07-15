package com.jamesaworo.stocky.features.settings.endpoint;

import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import com.jamesaworo.stocky.features.settings.data.interactor.setting_stock.ISettingStockInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

/**
 * @author Aworo James
 * @since 5/13/23
 */
@RestController
@RequestMapping(value = API_PREFIX + "/setting-stock")
@RequiredArgsConstructor
public class SettingStockyEndpoint {
    private final ISettingStockInteractor interactor;

    @GetMapping()
    public ResponseEntity<SettingRequest> get(@RequestParam() String key) {
        return this.interactor.get(key);
    }

    @GetMapping(value = "all")
    public ResponseEntity<List<SettingRequest>> getAll() {
        return interactor.getAll();
    }

    @PostMapping(value = "update-all")
    public ResponseEntity<Boolean> updateAll(@RequestBody List<SettingRequest> list) {
        return interactor.updateAll(list);
    }

    @PutMapping(value = "update")
    public ResponseEntity<Boolean> update(@RequestBody SettingRequest setting) {
        return interactor.update(setting);
    }


}