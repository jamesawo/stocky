package com.jamesaworo.stocky.features.authentication.domain.usecase;

import com.jamesaworo.stocky.features.authentication.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserUsecase {

	User save(User user);

	Optional<User> findOne(Long id);

	Optional<User> findByUsername(String username);

	Optional<User> update(User user);

	Optional<Boolean> toggleActiveStatus(Long id);

	List<User> findMany();

	void checkDuplicateUsername(String username);
}
