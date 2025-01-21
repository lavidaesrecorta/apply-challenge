## Deployment

To deploy this project, create a `.env` file in the root directory of the repository and replace the Contentful-related variables with the ones provided in the supplied document.  

```env
CONTENTFUL_SPACE_ID=space_id
CONTENTFUL_ACCESS_TOKEN=access_token
CONTENTFUL_ENVIRONMENT=environment
CONTENTFUL_CONTENT_TYPE=content_type

JWT_TOKEN=0

DB_HOST=db
DB_PORT=5432
DB_USER=apply_challenge
DB_PASS=apply backend challenge
DB_TABLE=products
DB_SYNCSCHEMA=true
```

Then, use the `docker compose up` command to start the back-end and the database services. The program will start in development mode and will sync the schema with the database on start.

## Choices / Assumptions

Using NestJS and TypeORM+PostgreSQL.


1. **JWT Token**: The system does not provide a way for users to register a new JWT token. It must be specified manually in the `.env` file.
  
2. **Unique SKU**: Each SKU is unique, meaning the same product will have different SKUs in different locales.

3. **Product Deletion**: Deleting a product in one locale does not affect the same product in other locales due to the unique SKU per locale. As such, the system implements a simple soft-delete function, which is natively supported by TypeORM. 