package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType;

public interface IProductBasicUsecase {
	ProductBasic save(ProductBasic basic);

	int updateProductQuantity(Long basicId, Integer quantity, ProductQuantityUpdateType updateType);
}
