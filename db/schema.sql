
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_recipes
CASCADE;
DROP TABLE IF EXISTS user_ingredients
CASCADE;





CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    pw_digest VARCHAR
);

CREATE TABLE user_recipes
(
    recipe_id VARCHAR(255) NOT NULL PRIMARY KEY,
    recipe_name VARCHAR(255),
    description TEXT,
    instructions TEXT,
    nutrition TEXT,
    image_url TEXT,
    user_id INT REFERENCES users(id) 
);

CREATE TABLE user_ingredients
(
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255),
    recipe_id VARCHAR(255),
    FOREIGN KEY (recipe_id) REFERENCES user_recipes(recipe_id)
);





