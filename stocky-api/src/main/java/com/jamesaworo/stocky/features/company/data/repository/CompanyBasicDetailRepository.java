package com.jamesaworo.stocky.features.company.data.repository;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyBasicDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface CompanyBasicDetailRepository extends JpaRepository<CompanyBasicDetail, Long> {
	Optional<CompanyBasicDetail> findBySetupKeyEqualsIgnoreCase(String setupKey);

	@Modifying
	@Transactional()
	@Query(value = "update CompanyBasicDetail c set c.setupValue = :setupValue where c.setupKey = :setupKey")
	int updateValueWhereKey(@Param(value = "setupValue") String setupValue, @Param(value = "setupKey") String setupKey);


}
