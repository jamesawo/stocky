package com.jamesaworo.stocky.features.authentication.data.interactor.contract;

import com.jamesaworo.stocky.features.authentication.data.request.PermissionGroupRequest;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IPermissionInteractor {
	ResponseEntity<List<PermissionRequest>> getAll();

	ResponseEntity<Optional<PermissionRequest>> getOne(Long id);

	ResponseEntity<List<PermissionGroupRequest>> getAllGroupedByModule();
}
