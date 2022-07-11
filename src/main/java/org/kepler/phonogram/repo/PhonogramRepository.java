package org.kepler.phonogram.repo;

import org.kepler.phonogram.model.Phonogram;
import org.springframework.data.repository.CrudRepository;


public interface PhonogramRepository extends CrudRepository<Phonogram, Integer> {
}
