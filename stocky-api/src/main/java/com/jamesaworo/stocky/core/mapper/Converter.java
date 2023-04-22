package com.jamesaworo.stocky.core.mapper;

/**
 * @author Aworo James
 * @since 4/21/23
 */
public interface Converter<T, I> {
    T map(I input);
}