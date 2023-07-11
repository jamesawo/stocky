/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.domain.entity.Setting;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingStock;
import com.jamesaworo.stocky.features.settings.domain.usecase.ISettingUsecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.Stock;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import static com.jamesaworo.stocky.core.constants.Setting.*;

@Usecase
@RequiredArgsConstructor
public class StockUsecaseImpl implements IStockUsecase {
	private final StockRepository repository;
	private final ISettingUsecase<SettingStock> settingUsecase;


	@Override
	public Stock save(Stock stock) {
		return this.repository.save(stock);
	}


	@Override
	public Stock setCodeAndSave(Stock stock) {
		stock.setCodePrefix(this.getStockPrefix());
		stock.setCode(this.generateCode());
		return this.save(stock);
	}

	@Override
	public Optional<Stock> findOne(Long id) {
		return Optional.empty();
	}

	@Override
	public Page<Stock> findMany(Specification<Stock> specification, Pageable pageable) {
		return null;
	}

	@Override
	public List<Stock> findMany(Specification<Stock> specification) {
		return null;
	}

	private Integer generateCode() {
		Stock stock = this.repository.findTopByOrderByIdDesc();

		if (stock == null) {
			return STOCK_CODE_DEFAULT_START;
		}
		return new AtomicInteger(stock.getCode()).incrementAndGet();
	}

	private String getStockPrefix() {
		Optional<SettingStock> optionalSettings = this.settingUsecase.get(SETTING_STOCK_BATCH_PREFIX_VALUE);
		return optionalSettings.map(Setting::getSettingValue).orElse(STOCK_PREFIX_DEFAULT);
	}
}
