/*
 * @Author: james.junior
 * @Date: 8/6/23 02:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.interactor.implementation;

import com.jamesaworo.stocky.configuration.security.JwtAuthenticationTokenUtil;
import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.ILoginInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.LoginRequest;
import com.jamesaworo.stocky.features.authentication.data.request.LoginResponse;
import com.jamesaworo.stocky.features.authentication.data.request.LoginUser;
import com.jamesaworo.stocky.features.authentication.data.request.Menu;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.authentication.domain.enums.AppModuleEnum;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IUserUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.util.ObjectUtils.isEmpty;

@Interactor
@RequiredArgsConstructor
public class LoginInteractorImpl implements ILoginInteractor {

    public static final String USER_NOT_FOUND = " %s not found";
    private static final String INVALID_USERNAME = "Invalid login credentials";
    private static final String ACCOUNT_EXPIRED = "Error! Account Is Expired";
    private static final String ACCOUNT_DISABLED = "Error! Account Is Currently Disabled";
    private static final String INVALID_LOGIN = "Invalid Login Credentials";

    private final IUserUsecase userUsecase;
    private final JwtAuthenticationTokenUtil jwtAuthenticationTokenUtil;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<LoginResponse> login(LoginRequest request) {
        User user = findByUsernameOrThrow(request.getUsername());
        LoginResponse loginResponse = this.authenticateUser(user, request.getPassword());
        return ResponseEntity.ok().body(loginResponse);
    }

    private User findByUsernameOrThrow(String username) {
        Optional<User> optional = this.userUsecase.findByUsername(username);
        return optional.orElseThrow(() -> new ResponseStatusException(BAD_REQUEST, INVALID_USERNAME));
    }

    private LoginResponse authenticateUser(User user, String password) {
        this.validateUserAccount(user, password);
        String token = this.jwtAuthenticationTokenUtil.generateToken(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, token, user.getGrantedAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return this.setLoginResponse(user, token);
    }

    private void validateUserAccount(User user, String password) {
        this.throwsInvalidIfPasswordNotMatch(password, user);
        this.throwsInvalidIfAccountIsExpired(user);
        this.throwsInvalidIfAccountIsDisabled(user);
    }

    private void throwsInvalidIfPasswordNotMatch(String password, User user) {
        if (isEmpty(password) || !this.passwordEncoder.matches(password, user.getPassword())) {
            throw new ResponseStatusException(BAD_REQUEST, INVALID_LOGIN);
        }
    }

    private void throwsInvalidIfAccountIsExpired(User user) {
        if (user.isAccountExpired()) {
            throw new ResponseStatusException(BAD_REQUEST, ACCOUNT_EXPIRED);
        }
    }

    private void throwsInvalidIfAccountIsDisabled(User user) {
        if (!user.getIsActiveStatus()) {
            throw new ResponseStatusException(BAD_REQUEST, ACCOUNT_DISABLED);
        }
    }

    private LoginResponse setLoginResponse(User user, String token) {
        LoginResponse response = new LoginResponse();
        response.setUser(this.user(user, token));
        response.setMenu(this.menu(user.getPermissionsTitleAsMap()));
        response.setApp(this.app());
        return response;
    }

    private LoginUser user(User user, String token) {
        LoginUser loginUser = new LoginUser();
        loginUser.setUsername(user.getUsername());
        loginUser.setEnabled(user.getIsActiveStatus());
        loginUser.setToken(token);
        loginUser.setId(user.getId());
        loginUser.setAccess(new ArrayList<>(user.getPermissionsTitleAsSet()));
        return loginUser;
    }

    private List<Menu> menu(Map<String, String> usersPermissions) {
        Menu main = new Menu("MENU", true);
        for (AppModuleEnum module : AppModuleEnum.values()) {
            Menu sub = Menu.parentWithChildren(module.name(), module.pageIcon(), usersPermissions, module.pageRoute());
            if (sub.getChildren() != null && sub.getChildren().size() > 0) {
                Menu.appendChild(main, sub);
            }
        }
        return List.of(main);
    }

    private Map<String, String> app() {
        Map<String, String> details = new HashMap<>();
        details.put("name", "Stocky");
        details.put("description", "Stocky, A store management software");
        details.put("version", "1.0.0");
        return details;
    }

}
