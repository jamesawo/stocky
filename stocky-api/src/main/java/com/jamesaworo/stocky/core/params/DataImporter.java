package com.jamesaworo.stocky.core.params;

public interface DataImporter<Type, Data> {
    Type export(Data dataToImport);
}
