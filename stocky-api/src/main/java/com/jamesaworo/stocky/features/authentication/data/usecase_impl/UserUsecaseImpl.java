/*
 * @Author: james.junior
 * @Date: 6/18/23 19:49
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.authentication.data.repository.UserRepository;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IUserUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Usecase
@RequiredArgsConstructor
public class UserUsecaseImpl implements IUserUsecase {
	private final UserRepository repository;


	@Override
	public User save(User user) {
		throwsIfUsernameIsTaken(user.getUsername());
		this.encodePassword(user);
		return this.repository.save(user);
	}

	public void encodePassword(User user) {
		// todo implement spring securities
		//		PasswordEncoder encoder = new BCryptPasswordEncoder();
		//		String encodedPassword = encoder.encode(password);
		//		user.setPassword(encodedPassword);
	}

	@Override
	public Optional<User> findOne(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return this.repository.findByUsernameEqualsIgnoreCase(username);
	}

	@Override
	public Optional<User> update(User user) {
		Optional<User> optionalUser = this.findOne(user.getId());
		return optionalUser.map(this::save);
	}

	@Override
	public Optional<Boolean> toggleActiveStatus(Long id) {
		Optional<User> optionalUser = this.findOne(id);
		return optionalUser.map(this::updateActiveStatus);
	}

	@Override
	public List<User> findMany() {
		return this.repository.findAll();
	}

	@Override
	public void checkDuplicateUsername(String username) {
		this.throwsIfUsernameIsTaken(username);
	}

	private Boolean updateActiveStatus(User user) {

		int count = this.repository.updateIsActiveStatus(!user.getIsActiveStatus(), user.getId());
		return count == 1;
	}

	public void throwsIfUsernameIsTaken(String username) {
		Optional<User> optionalUser = this.repository.findByUsernameEqualsIgnoreCase(username);
		if (optionalUser.isPresent()) {
			throw new ResponseStatusException(BAD_REQUEST, String.format("USERNAME %s IS ALREADY TAKEN", username));
		}
	}
}
