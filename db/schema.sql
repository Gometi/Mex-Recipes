
DROP TABLE IF EXISTS default_recipes CASCADE;
DROP TABLE IF EXISTS default_ingredients CASCADE;
DROP TABLE IF EXISTS user_recipes
CASCADE;
DROP TABLE IF EXISTS user_ingredients
CASCADE;


CREATE TABLE default_recipes(
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255),
    description TEXT,
    instructions TEXT,
    nutrition TEXT,
    image_url TEXT
);

CREATE TABLE default_ingredients(
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255),
    recipe_id INT,
    FOREIGN KEY (recipe_id) REFERENCES default_recipes(recipe_id)
);


CREATE TABLE user_recipes
(
    recipe_id VARCHAR(255) NOT NULL PRIMARY KEY,
    recipe_name VARCHAR(255),
    description TEXT,
    instructions TEXT,
    nutrition TEXT,
    image_url TEXT
);

CREATE TABLE user_ingredients
(
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255),
    recipe_id VARCHAR(255),
    FOREIGN KEY (recipe_id) REFERENCES user_recipes(recipe_id)
);


