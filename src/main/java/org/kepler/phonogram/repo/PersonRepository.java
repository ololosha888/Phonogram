package org.kepler.phonogram.repo;

import org.kepler.phonogram.model.Person;
import org.springframework.data.repository.CrudRepository;


public interface PersonRepository extends CrudRepository<Person, Integer>{
}
