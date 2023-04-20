package com.jamesaworo.stocky.features.settings.domain.entities;

import com.jamesaworo.stocky.core.enumconstants.SettingField;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@MappedSuperclass
@TypeDef(name = "json", typeClass = JsonType.class)

public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String settingKey;
    private String settingValue;
    private SettingField settingField;
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Map<String, String> settingOptions;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;

}