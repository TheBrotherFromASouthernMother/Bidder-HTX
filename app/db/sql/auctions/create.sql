CREATE TABLE auctions (
    id                  SERIAL     PRIMARY KEY,
    auction_name        VARCHAR    NOT NULL,
    auction_desc        VARCHAR    NOT NULL,
    start_datetime      TIMESTAMP  NOT NULL,
    end_datetime        TIMESTAMP  NOT NULL
);