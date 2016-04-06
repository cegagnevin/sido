package com.sopra.hackaton.rest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.sopra.hackaton.model.Domain;

@RepositoryRestResource(collectionResourceRel = "domain", path = "domain")
public interface DomainRepository extends MongoRepository<Domain, String> {
}
