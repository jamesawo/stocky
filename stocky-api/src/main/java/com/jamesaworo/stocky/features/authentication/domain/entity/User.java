/*
 * @Author: james.junior
 * @Date: 6/18/23 19:27
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;

import static com.jamesaworo.stocky.core.constants.Table.AUTH_USER;
import static com.jamesaworo.stocky.core.constants.Table.AUTH_USER_ROLE;

@Data
@Builder
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = AUTH_USER)
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseModel {

	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Username cannot be empty")
	@Column(nullable = false, unique = true)
	private String username;
	private String password;
	private LocalDate expirationDate = LocalDate.now().plusMonths(6);

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = AUTH_USER_ROLE,
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;

	public boolean isAccountExpired() {
		return this.getExpirationDate().isBefore(LocalDate.now());
	}


}
