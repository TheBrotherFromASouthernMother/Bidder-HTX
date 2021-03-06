CREATE TABLE users (
    id                      SERIAL      PRIMARY KEY,
    last_name               VARCHAR     NOT NULL,
    first_name              VARCHAR     NOT NULL,
    middle_name             VARCHAR,
    org_name                VARCHAR,
    phone                   VARCHAR,
    email                   VARCHAR     NOT NULL UNIQUE,
    password                VARCHAR     NOT NULL,
    mailing_address_line_1  VARCHAR,
    mailing_address_line_2  VARCHAR,
    mailing_address_city    VARCHAR,
    mailing_address_state   VARCHAR,
    mailing_address_zip     VARCHAR,
    mailing_address_country VARCHAR,
    billing_address_line_1  VARCHAR,
    billing_address_line_2  VARCHAR,
    billing_address_city    VARCHAR,
    billing_address_state   VARCHAR,
    billing_address_zip     VARCHAR,
    billing_address_country VARCHAR
);


ALTER TABLE users ADD COLUMN activation_hash VARCHAR, ADD COLUMN verified BOOLEAN DEFAULT FALSE;
