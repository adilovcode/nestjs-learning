# Calendly

### Folder structure
    / src
        / application
            / repositories <-- Abstractions
            / services
            / use-cases
        
        /infrastructure
                / persistence  <-- Our databases
                    / postgres
                        / migrations
                        / repositories <-- Implementation
                        / models       <-- Entities that are connected to Postgres
                        
        /domain
            / entities <-- Our objects which we will use through our application
            / dtos     <-- Like create-event.dto.ts
        
        / config  <-- Configurations for databases, etc.
            / postgres.ts
            

This architecture is very flexible for example we want to change our database connection.
We have only:
1. create a new folder under `` src/infrastructure/persistance/mysql `` 
2. After we can implement interfaces under `` src/application/repositories ``
3. Change connection in `` infrastructure.module.ts ``
        