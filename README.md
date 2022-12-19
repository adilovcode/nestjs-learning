# Calendly

### Folder structure
    / src
        / application
            / repositories <-- Abstractions
            / services
            / use-cases
            / factories    <-- In order to create entities
        
        /infrastructure
                / persistence  <-- Our databases
                    / postgres
                        / migrations
                        / repositories <-- Implementation
                        / models       <-- Models
                / controllers
        /domain
            / entities <-- Our objects which we will use through our application
            / dtos     <-- Like create-event.dto.ts
            / value-objects
        
        / config  <-- Configurations for databases, etc.
            / postgres.ts


This architecture is very flexible for example: 

We want to change our database or to change ORM. We have only:

1. create a new folder under `` src/infrastructure/persistance `` 
2. After we can implement interfaces under `` src/application/repositories ``
3. Change connection in `` infrastructure.module.ts ``
        
