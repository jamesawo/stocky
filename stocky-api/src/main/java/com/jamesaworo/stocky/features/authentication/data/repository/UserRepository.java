/*
 * @Author: james.junior
 * @Date: 6/18/23 19:49
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.repository;

import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    @Modifying
    @Query(value = "update User c set c.isActiveStatus = :status where c.id = :id")
    int updateIsActiveStatus(@Param(value = "status") Boolean status, @Param(value = "id") Long id);

    Optional<User> findByUsernameEqualsIgnoreCase(String username);

    @Transactional
    @Modifying
    @Query(value = "update User c set c.expirationDate = :date where c.id = :id")
    int updateExpiryDate(@Param(value = "date") LocalDate date, @Param(value = "id") Long id);

}
