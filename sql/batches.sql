DROP DATABASE IF EXISTS bn;
CREATE DATABASE bn;

\c bn;

CREATE TABLE batches (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  style VARCHAR,
  blg INTEGER,
  vol INTEGER
);

INSERT INTO batches (name, style, blg, vol)
  VALUES ('Pierwsza warka', 'Foreing Extra Stout', 17, 7);