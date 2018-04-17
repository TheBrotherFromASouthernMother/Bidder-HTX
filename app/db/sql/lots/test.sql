CREATE TABLE lots (
    id              SERIAL      PRIMARY KEY,
    starting_bid    FLOAT       NOT NULL,
    bid_increments  INT         NOT NULL,
    lot_number      INT         NOT NULL,
    artwork_id      INT         references          ARTWORKS(id)       NOT NULL,
    auction_id      INT         references          AUCTIONS(id)        NOT NULL
);

INSERT INTO lots (id, starting_bid, bid_increments, lot_number, artwork_id, auction_id) VALUES
    (DEFAULT, 1000.00)