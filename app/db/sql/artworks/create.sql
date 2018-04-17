CREATE TABLE artworks (
    id                      SERIAL      PRIMARY KEY,
    title                   VARCHAR     NOT NULL,
    year                    SMALLINT,
    dimensions              VARCHAR,
    materials               VARCHAR,
    edition                 VARCHAR,
    artist                  VARCHAR     NOT NULL,
    detail_desc             VARCHAR,
    fmv                     FLOAT,
    images                  VARCHAR[]
);