package com.jamesaworo.stocky.core.params;

public interface DataExporter<Type, Data> {
    Type export(Data dataToExport);
}
