/*
 * @Author: james.junior
 * @Date: 5/29/23 18:16
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.base;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Data
@MappedSuperclass
public class BaseModel {
	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@CreatedBy
	@Column
	private String createdBy;

	@LastModifiedDate
	@Column
	private LocalDateTime updatedAt;

	@LastModifiedBy
	@Column
	private String lastUpdatedBy;

	@Column
	private String deletedBy;

	@Column
	private LocalDateTime deletedAt;

	@Column(nullable = false)
	private Boolean isActiveStatus = Boolean.TRUE;
}
