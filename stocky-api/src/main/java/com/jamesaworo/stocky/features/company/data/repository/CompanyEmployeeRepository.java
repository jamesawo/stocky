package com.jamesaworo.stocky.features.company.data.repository;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CompanyEmployeeRepository extends JpaRepository<CompanyEmployee, Long>, JpaSpecificationExecutor<CompanyEmployee> {
	Page<CompanyEmployee> findAll(Specification<CompanyEmployee> specification, Pageable pageable);

	List<CompanyEmployee> findAll(Specification<CompanyEmployee> specification);

	@Transactional
	@Modifying
	@Query(value = "update CompanyEmployee c set c.isActiveStatus = :status where c.id = :id")
	int updateIsActiveStatus(@Param(value = "status") Boolean status, @Param(value = "id") Long id);

}
