package com.jamesaworo.stocky.core.annotations;

import org.springframework.core.annotation.AliasFor;
import org.springframework.stereotype.Component;

import java.lang.annotation.*;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Usecase {
    @AliasFor(annotation = Component.class)
    String value() default "";
}