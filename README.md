# [https://task-user-images.deno.dev](https://task-user-images.deno.dev) => result

## Task Description

### Node.js

#### 1. Create Models

- **User Model**
  - Fields:
    - `id` (Primary Key)
    - `name` (String)
    - `city` (String)
    - `created_at` (Timestamp)
    - Other relevant fields...

- **UserImage Model**
  - Fields:
    - `id` (Primary Key)
    - `image` (String, stores image path or URL)
    - `created_at` (Timestamp)
    - `user_id` (Foreign Key, references `User` model)

- **Associations**
  - A `User` can have multiple `UserImages`.

#### 2. Create Seeder for User Model

- Create a seeder that generates 10,000 records in the `User` table.

#### 3. Create Seeder for UserImage Model

- Create a seeder that generates 100,000 records in the `UserImage` table, each
  linked randomly to a `User`.

#### 4. Create API Endpoint: List Users Sorted by Number of Images

- Create an API endpoint that returns a list of `Users` sorted by the number of
  `UserImages` they have.

#### 5. Create API Endpoint: Create User with UserImage

- Create an API endpoint to create a new `User` along with an associated
  `UserImage`.
- The API should accept:
  - `name` (string)
  - `city` (string)
  - `image` (file - jpg, png)

### HTML + JavaScript

#### 1. Simple Page with Data Table

- Create a simple HTML page with a table to display `Users` (name, city,
  images_count) sorted by the number of `UserImages`.
- Data in the table should be loaded using AJAX from the API.

#### 2. Simple Form to Create User with Image

- Create a simple form where the user can input:
  - `name` (text)
  - `city` (text)
  - `image` (file - jpg, png)
