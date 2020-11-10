# Requirements of the framework
On the following points, I'll write requirements of the framework.

## Good structured files
- Contains the following layers:
  - Model: Communicate directly with database
  - Routers: Communicate directly with requests
  - Data access layer: that use model to get required data as needed
  - Controller: Used by routers to handle the requsts and do request job.  
- Contains tests
Each file should have it's own test file that test it's functions
- Validations:
Each request should have it's own data validation
- 
- `CMD` feature:
This is the most important feature, we should be able to create `controllers` and `models` using the command-line, the file should be created with a standard-structure.

- Create a model with it's router, controller, model itself, and data access layer, all of these in one command in the `cmd`
- Create app from `CMD` using one command with options
