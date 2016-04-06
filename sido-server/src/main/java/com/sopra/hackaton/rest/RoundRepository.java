package com.sopra.hackaton.rest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.sopra.hackaton.model.Round;

@RepositoryRestResource(collectionResourceRel = "round", path = "round")
public interface RoundRepository extends MongoRepository<Round, String> {
}
