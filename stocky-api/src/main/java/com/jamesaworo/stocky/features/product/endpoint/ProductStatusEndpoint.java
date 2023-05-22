/*
 * @Author: james.junior
 * @Date: 5/22/23 01:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductStatusInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductStatusRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/product-status")
@RequiredArgsConstructor
public class ProductStatusEndpoint {

	private final IProductStatusInteractor interactor;

	@GetMapping(value = "get/{id}")
	public ResponseEntity<Optional<ProductStatusRequest>> find(@PathVariable Long id) {
		return this.interactor.find(id);
	}

	@GetMapping("all")
	public ResponseEntity<List<ProductStatusRequest>> findMany() {
		return this.interactor.findAll();
	}

	@PostMapping("create")
	public ResponseEntity<Optional<ProductStatusRequest>> save(
			@RequestBody @Valid ProductStatusRequest dto
	) {
		return this.interactor.save(dto);
	}

	@PutMapping("update")
	public ResponseEntity<Optional<ProductStatusRequest>> update(
			@RequestBody @Valid ProductStatusRequest request
	) {
		return this.interactor.update(request);
	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<Optional<Boolean>> remove(@PathVariable Long id) {
		return this.interactor.remove(id);
	}

}
