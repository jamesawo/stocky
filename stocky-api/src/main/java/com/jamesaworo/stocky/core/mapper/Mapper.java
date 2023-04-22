package com.jamesaworo.stocky.core.mapper;

/**
 * @author Aworo James
 * @since 4/21/23
 */
public interface Mapper<K, I> {

    K to(I input);

    I from(K output);

}