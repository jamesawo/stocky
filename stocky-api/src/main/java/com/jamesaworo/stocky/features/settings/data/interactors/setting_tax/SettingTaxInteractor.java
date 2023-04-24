package com.jamesaworo.stocky.features.settings.data.interactors.setting_tax;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.settings.data.dto.SettingDto;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingTaxUsecase;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingTax;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.empty;
import static org.springframework.http.ResponseEntity.of;
import static org.springframework.http.ResponseEntity.ok;

/**
 * @author Aworo James
 * @since 4/20/23
 */

@Interactor
@AllArgsConstructor
public class SettingTaxInteractor implements ISettingTaxInteractor, Mapper<SettingDto, SettingTax> {

    private SettingTaxUsecase usecase;

    @Override
    public ResponseEntity<SettingDto> get(String key) {
        var optionalSetting = this.usecase.get(key);
        return optionalSetting.map(setting -> ok(this.to(setting))).orElse(of(empty()));

    }

    @Override
    public ResponseEntity<List<SettingDto>> getAll() {
        var settings = this.usecase.all();
        var collection = settings.stream().map(this::to).collect(Collectors.toList());
        return ok(collection);
    }

    @Override
    public ResponseEntity<Boolean> update(SettingDto dto) {
        return ok(this.usecase.update(dto.getSettingKey(), dto.getSettingValue()));

    }

    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingDto> list) {
        var settings = list.stream().map(this::from).collect(Collectors.toList());
        return ok(this.usecase.updateMany(settings));
    }

    @Override
    public SettingDto to(SettingTax input) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(input, SettingDto.class);
    }

    @Override
    public SettingTax from(SettingDto output) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(output, SettingTax.class);
    }
}