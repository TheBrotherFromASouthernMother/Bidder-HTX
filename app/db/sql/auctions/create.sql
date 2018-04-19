CREATE TABLE auctions (
    id                  SERIAL     PRIMARY KEY,
    auction_name        VARCHAR    NOT NULL,
    auction_desc        VARCHAR    NOT NULL,
    start_datetime      TIMESTAMP  NOT NULL,
    end_datetime        TIMESTAMP  NOT NULL
);


ALTER TABLE auctions
    ADD COLUMN start_timestamp TIMESTAMP WITH TIME ZONE,
    ADD COLUMN end_timestamp TIMESTAMP WITH TIME ZONE,
    DROP COLUMN start_datetime,
    DROP COLUMN end_datetime;