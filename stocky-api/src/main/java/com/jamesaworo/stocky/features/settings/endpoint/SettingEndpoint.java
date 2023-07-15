/*
 * @Author: james.junior
 * @Date: 7/14/23 10:06
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.settings.endpoint;

import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import com.jamesaworo.stocky.features.settings.data.interactor.base.SettingInteractor;
import com.jamesaworo.stocky.features.settings.domain.enums.SettingModule;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/setting")
@RequiredArgsConstructor
public class SettingEndpoint {

    private final SettingInteractor interactor;
    
    @GetMapping(value = "/find")
    public ResponseEntity<SettingRequest> getSettingByKeyAndModule(
            @RequestParam() String key,
            @RequestParam() SettingModule module
    ) {
        return this.interactor.get(key, module);
    }


}
