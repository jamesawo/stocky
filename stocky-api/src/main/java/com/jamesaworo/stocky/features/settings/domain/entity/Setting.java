package com.jamesaworo.stocky.features.settings.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.core.constants.enums.SettingField;
import com.jamesaworo.stocky.features.settings.domain.enums.SettingModule;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@MappedSuperclass
@TypeDef(name = "json", typeClass = JsonType.class)
@Setter
@Getter
public class Setting extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String settingKey;

    private String settingValue;

    private SettingField settingField;

    @Column(nullable = false)
    private String settingTitle;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Collection<SettingOption> settingOptions;

    private String settingHint;

    private SettingModule module;

    public Setting() {
    }

    public Setting(String settingKey, String settingValue) {
        this.settingKey = settingKey;
        this.settingValue = settingValue;
    }

    public Setting(String key, String value, SettingField field, String[] options, String title) {
        this.setSettingKey(key);
        this.setSettingValue(value);
        this.setSettingField(field);
        var map = stream(options).map(option -> new SettingOption(option, option)).collect(Collectors.toList());
        this.setSettingOptions(map);
        this.setSettingTitle(title);

    }

    public Setting(
            String key,
            String value,
            SettingField field,
            String[] options,
            String title,
            String hint
    ) {
        this.setSettingKey(key);
        this.setSettingValue(value);
        this.setSettingField(field);
        var map = stream(options).map(option -> new SettingOption(option, option)).collect(Collectors.toList());
        this.setSettingOptions(map);
        this.setSettingTitle(title);
        this.setSettingHint(hint);

    }

    // active
    public Setting(SettingObj obj) {
        this.id = obj.getId();
        this.settingKey = obj.getKey();
        this.settingValue = obj.getValue();
        this.settingField = obj.getField();
        this.settingTitle = obj.getTitle();
        this.settingOptions = obj.getOptions();
        this.settingHint = obj.getHint();
        this.module = obj.getModule();
    }

    private static Collection<SettingOption> mapOptionsToCollection(Map<String, String> options) {
        Collection<SettingOption> settingOptions = new ArrayList<>();
        options.forEach((key, value) -> settingOptions.add(new SettingOption(key, value)));
        return settingOptions;
    }

    @PrePersist()
    void prePersist() {
        this.setCreatedAt(LocalDateTime.now());
    }

}