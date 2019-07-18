export const tables = `
CREATE TABLE
            users(
                id SERIAL PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                first_name TEXT NOT NULL,
                last_name TEXT,
                password TEXT NOT NULL,
                phonenumber TEXT NOT NULL,
                address TEXT NOT NULL,
                is_admin BOOLEAN);
CREATE TABLE
            properties(
                id SERIAL PRIMARY KEY,
                owner INTEGER NOT NULL ,
                status TEXT NOT NULL,
                price TEXT NOT NULL,
                state TEXT NOT NULL,
                city TEXT NOT NULL,
                address TEXT NOT NULL,
                type TEXT NOT NULL,
                created_on DATE,
                image_url TEXT NOT NULL,
                FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE
          flags(
              id SERIAL PRIMARY KEY,
              property_id INTEGER NOT NULL,
              FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,              
              created_on DATE,
              reason TEXT NOT NULL,
              description VARCHAR(128) NOT NULL,
              flagger INTEGER NOT NULL ,
              FOREIGN KEY(flagger) REFERENCES users(id) ON DELETE CASCADE
);`;
