/*
 * @Author: james.junior
 * @Date: 6/12/23 14:52
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.endpoint;

import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyExpensesCategoryInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyExpensesCategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/company/expenses/category")
@RequiredArgsConstructor
public class CompanyExpensesCategoryEndpoint {
	private final ICompanyExpensesCategoryInteractor interactor;

	@PostMapping(value = "create")
	public ResponseEntity<CompanyExpensesCategoryRequest> save(@RequestBody CompanyExpensesCategoryRequest category) {
		return this.interactor.save(category);
	}

	@GetMapping(value = "all")
	public ResponseEntity<List<CompanyExpensesCategoryRequest>> findAll() {
		return this.interactor.findAll();
	}

	@GetMapping(value = "get/{id}")
	public ResponseEntity<Optional<CompanyExpensesCategoryRequest>> findOne(@PathVariable Long id) {
		return this.interactor.findOne(id);
	}

	@PutMapping("update")
	public ResponseEntity<Optional<CompanyExpensesCategoryRequest>> update(
			@RequestBody @Valid CompanyExpensesCategoryRequest request
	) {
		return this.interactor.update(request);
	}

}
