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

    /**
     * This method is used to retrieve a specific SettingRequest object based on the given key and module.
     * <p>
     * It uses the SettingModule to get the ISettingBaseInteractor implementation from the ApplicationContext.
     *
     * @param key    the key of the SettingRequest object to be retrieved.
     * @param module the module of the SettingRequest object.
     * @return a ResponseEntity object containing the retrieved SettingRequest object.
     */
    @Override
    public ResponseEntity<SettingRequest> get(String key, SettingModule module) {
        ISettingBaseInteractor interactor = module.interactor(context);
        return interactor.get(key);
    }

    /**
     * This method is used to retrieve a specific SettingRequest object based on the given key.
     *
     * @param key the key of the SettingRequest object to be retrieved.
     * @return a ResponseEntity object containing the retrieved SettingRequest object.
     */
    @Override
    public ResponseEntity<SettingRequest> get(String key) {
        return null;
    }

    /**
     * This method is used to retrieve all SettingRequest objects.
     *
     * @return a ResponseEntity object containing a list of all SettingRequest objects.
     */
    @Override
    public ResponseEntity<List<SettingRequest>> getAll() {
        return null;
    }


    /**
     * This method is used to update a SettingRequest object.
     *
     * @param dto the SettingRequest object to be updated.
     * @return a ResponseEntity object indicating the success or failure of the update operation.
     */
    @Override
    public ResponseEntity<Boolean> update(SettingRequest dto) {
        ISettingBaseInteractor interactor = dto.getSettingModule().interactor(context);
        return interactor.update(dto);
    }

    /**
     * This method is used to update multiple SettingRequest objects.
     *
     * @param list the list of SettingRequest objects to be updated.
     * @return a ResponseEntity object indicating the success or failure of the update operation.
     */
    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingRequest> list) {
        return null;
    }
}
