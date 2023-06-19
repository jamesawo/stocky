/*
 * @Author: james.junior
 * @Date: 6/13/23 10:51
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.domain.entity;

import com.jamesaworo.stocky.core.base.BaseModel;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

import static com.jamesaworo.stocky.core.constants.Table.AUTH_ROLE;
import static com.jamesaworo.stocky.core.constants.Table.ROLE_PERMISSION_TABLE;

@Data
@Builder
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = AUTH_ROLE)
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Role extends BaseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Name cannot be null")
	@Column(unique = true, nullable = false)
	private String name;

	@Column
	private String description;


	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = ROLE_PERMISSION_TABLE,
			joinColumns = @JoinColumn(name = "role_id"),
			inverseJoinColumns = @JoinColumn(name = "permission_id"))
	private Set<Permission> permissions;


	public Role(String name, Set<Permission> permissions) {
		this.name = name;
		this.permissions = permissions;
	}

	public Role(Long id) {
		this.id = id;
	}
}
