/*
 * @Author: james.junior
 * @Date: 5/21/23 21:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyPaymentOptionRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyPaymentOption;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyPaymentOptionUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.Optional.of;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.util.ObjectUtils.isEmpty;

@Usecase
@RequiredArgsConstructor
@Slf4j
public class CompanyPaymentOptionUsecaseImpl implements ICompanyPaymentOptionUsecase {
	private static final String DUPLICATE_RECORD = "DUPLICATE NAME ALREADY EXIST";
	private final CompanyPaymentOptionRepository repository;


	public List<CompanyPaymentOption> findAll() {
		return this.repository.findAll();
	}


	public Optional<CompanyPaymentOption> save(CompanyPaymentOption model) {
		this.throwIfDuplicateExist(model);
		return of(this.repository.save(model));
	}

	@Override
	public Boolean disable(Long id) {
		int count = this.repository.updateIsActiveStatus(Boolean.FALSE, id);
		return count == 1;
	}

	@Override
	public Boolean enable(Long id) {
		int count = this.repository.updateIsActiveStatus(Boolean.TRUE, id);
		return count == 1;
	}

	@Override
	public Optional<CompanyPaymentOption> findOne(Long id) {
		return this.repository.findById(id);
	}


	@Override
	public Boolean toggleStatus(boolean status, Long id) {
		if (status) {
			return this.enable(id);
		}
		else {
			return this.disable(id);
		}
	}

	private void throwIfDuplicateExist(CompanyPaymentOption model) {
		if (isEmpty(model.getId())) {
			Optional<CompanyPaymentOption> optional = this.repository.findByTitleEqualsIgnoreCase(model.getTitle());

			optional.ifPresent(e -> {
				throw new ResponseStatusException(CONFLICT, DUPLICATE_RECORD);
			});
		}
	}

	private Optional<Boolean> delete(CompanyPaymentOption model) {
		try {
			this.repository.delete(model);
			return Optional.of(Boolean.TRUE);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return Optional.of(Boolean.FALSE);
		}
	}
}
