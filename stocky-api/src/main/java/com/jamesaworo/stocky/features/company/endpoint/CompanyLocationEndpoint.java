/*
 * @Author: james.junior
 * @Date: 5/22/23 01:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.endpoint;

import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyLocationInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyLocationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/company/location/")
@RequiredArgsConstructor
public class CompanyLocationEndpoint {

	private final ICompanyLocationInteractor interactor;

	@GetMapping(value = "get/{id}")
	public ResponseEntity<Optional<CompanyLocationRequest>> find(@PathVariable Long id) {
		return this.interactor.find(id);
	}

	@GetMapping("all")
	public ResponseEntity<List<CompanyLocationRequest>> findMany() {
		return this.interactor.findAll();
	}

	@PostMapping("create")
	public ResponseEntity<Optional<CompanyLocationRequest>> save(
			@RequestBody @Valid CompanyLocationRequest dto
	) {
		return this.interactor.save(dto);
	}

	@PutMapping("update")
	public ResponseEntity<Optional<CompanyLocationRequest>> update(
			@RequestBody @Valid CompanyLocationRequest request
	) {
		return this.interactor.update(request);
	}

	@PutMapping("status/{id}")
	public ResponseEntity<Optional<Boolean>> toggleIsActiveStatus(@PathVariable Long id) {
		return this.interactor.toggleActiveStatus(id);
	}


}
