package com.jamesaworo.stocky.features.settings.data.interactor.setting_sale;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingSaleUsecase;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingSale;
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
public class SettingSaleInteractor implements ISettingSaleInteractor, Mapper<SettingRequest, SettingSale> {

    private SettingSaleUsecase usecase;

    @Override
    public ResponseEntity<SettingRequest> get(String key) {
        var optionalSetting = this.usecase.get(key);
        return optionalSetting.map(setting -> ok(this.toRequest(setting))).orElse(of(empty()));

    }

    @Override
    public ResponseEntity<List<SettingRequest>> getAll() {
        var settings = this.usecase.all();
        var collection = settings.stream().map(this::toRequest).collect(Collectors.toList());
        return ok(collection);
    }

    @Override
    public ResponseEntity<Boolean> update(SettingRequest dto) {
        return ok(this.usecase.update(dto.getSettingKey(), dto.getSettingValue()));

    }

    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingRequest> list) {
        var settings = list.stream().map(this::toModel).collect(Collectors.toList());
        return ok(this.usecase.updateMany(settings));
    }

    @Override
    public SettingRequest toRequest(SettingSale model) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(model, SettingRequest.class);
    }

    @Override
    public SettingSale toModel(SettingRequest request) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(request, SettingSale.class);
    }
}