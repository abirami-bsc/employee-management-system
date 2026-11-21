package employee_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import employee_backend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    boolean existsByEmail(String email);

}