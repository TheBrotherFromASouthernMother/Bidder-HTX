CREATE TABLE bids (
    id              SERIAL          PRIMARY KEY,
    bid_amount      FLOAT           NOT NULL,
    bid_timestamp   TIMESTAMP       NOT NULL,
    winning_bid     BOOLEAN,
    user_id         INT             references          USER(id)        NOT NULL,
    lot_id          INT             references          LOTS(id)        NOT NULL
);