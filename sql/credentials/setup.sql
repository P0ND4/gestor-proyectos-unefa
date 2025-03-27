CREATE EXTENSION IF NOT EXISTS pgcrypto; -- required for crypt() and similar functions

CREATE TABLE IF NOT EXISTS Users(
	id SERIAL PRIMARY KEY,
	login VARCHAR(128) NOT NULL UNIQUE,
	password TEXT NOT NULL
);

---- set table access to functions only:
-- SECURITY LABEL FOR selinux ON TABLE Users IS 'system_u:object_r:sepgsql_table_t:s0';
---- mask retrieved data:
-- SECURITY LABEL ON COLUMN Users.login IS 'system_u:object_r:sepgsql_secret_table_t:s0';
-- SECURITY LABEL ON COLUMN Users.password IS 'system_u:object_r:sepgsql_secret_table_t:s0';

CREATE OR REPLACE PROCEDURE store_credentials(VARCHAR, TEXT)
AS $$
	BEGIN
		INSERT INTO Users (login, password)
		VALUES ($1, crypt($2, gen_salt('bf')) );
		
		COMMIT;
	END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION check_credentials(VARCHAR, TEXT) RETURNS BOOLEAN
AS $$
	BEGIN
		IF (SELECT id FROM Users WHERE login = $1 AND password = crypt($2, password)) IS NULL THEN RETURN FALSE;
		ELSE RETURN TRUE;
		END IF;
	END;
$$ LANGUAGE 'plpgsql';
