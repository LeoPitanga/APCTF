
CREATE TABLE IF NOT EXISTS apctf.activities
(
	activity_id VARCHAR (255) PRIMARY KEY,
	instrucoesacesso TEXT,
	instrucoesobjetivo TEXT,
	act_flag VARCHAR (255),
	dica1 TEXT,
	dica2 TEXT,
	dica3 TEXT
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS apctf.students
(
	id SERIAL PRIMARY KEY,
	invenira_std_id VARCHAR(255),
	activity_id_fk VARCHAR(255) NOT NULL,
	acessoAtividade BOOLEAN,
	acessoInstrucoes BOOLEAN,
	acessoObjetivo BOOLEAN,
	acertouFlag BOOLEAN,
	acessoDica1 BOOLEAN,
	acessoDica2 BOOLEAN,
	acessoDica3 BOOLEAN,
	FOREIGN KEY (activity_id_fk)
		REFERENCES apctf.activities (activity_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS apctf.activities
    OWNER to postgres;

ALTER TABLE IF EXISTS apctf.students
    OWNER to postgres;