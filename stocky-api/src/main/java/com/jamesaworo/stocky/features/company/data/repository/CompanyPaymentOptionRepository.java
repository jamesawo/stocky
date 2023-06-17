package com.jamesaworo.stocky.features.company.data.repository;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyPaymentOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface CompanyPaymentOptionRepository extends JpaRepository<CompanyPaymentOption, Long> {
	Optional<CompanyPaymentOption> findByTitleEqualsIgnoreCase(String title);

	@Transactional
	@Modifying
	@Query(value = "update CompanyPaymentOption c set c.isActiveStatus = :status where c.id = :id")
	int updateIsActiveStatus(@Param(value = "status") Boolean status, @Param(value = "id") Long id);
}
