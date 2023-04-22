package com.jamesaworo.stocky.features.settings.data.interactors.setting_backup_restore;


import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Converter;
import com.jamesaworo.stocky.features.settings.data.dto.SettingBackupDto;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingBackupUsecase;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingBackUpRestore;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Interactor
@RequiredArgsConstructor
public class SettingBackupInteractor implements ISettingBackupInteractor, Converter<SettingBackupDto, SettingBackUpRestore> {

    private final SettingBackupUsecase usecase;

    @Override
    public ResponseEntity<List<SettingBackupDto>> getAll() {
        var settings = this.usecase.all();
        var collection = settings.stream().map(this::map).collect(Collectors.toList());
        return ResponseEntity.ok(collection);
    }

    @Override
    public ResponseEntity<Optional<Boolean>> update(SettingBackupDto dto) {
        return null;
    }

    @Override
    public ResponseEntity<Optional<Boolean>> updateAll(List<SettingBackupDto> list) {
        return null;
    }


    @Override
    public SettingBackupDto map(SettingBackUpRestore input) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(input, SettingBackupDto.class);
    }
}