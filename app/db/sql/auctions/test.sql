CREATE TABLE auctions (
    id                  SERIAL     PRIMARY KEY,
    auction_name        VARCHAR    NOT NULL,
    auction_desc        VARCHAR    NOT NULL,
    start_datetime      DATETIME   NOT NULL,
    end_datetime        DATETIME   NOT NULL,
);


INSERT INTO auctions (id, auction_name, start_timestamp, end_timestamp) VALUES
    (DEFAULT, "Dumbledore's Auction", "An auction of Dumbledore's artwork.", '2018-05-01 12:00:00', '2018-06-01 12:00:00');