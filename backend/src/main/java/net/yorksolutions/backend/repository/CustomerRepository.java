package net.yorksolutions.backend.repository;
import net.yorksolutions.backend.model.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CustomerRepository  extends CrudRepository<Customer,Long> {

}
