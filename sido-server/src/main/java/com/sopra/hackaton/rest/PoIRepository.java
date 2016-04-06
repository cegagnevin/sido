package com.sopra.hackaton.rest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.sopra.hackaton.model.PoI;

@RepositoryRestResource(collectionResourceRel = "poi", path = "poi")
public interface PoIRepository extends MongoRepository<PoI, String> {
}
