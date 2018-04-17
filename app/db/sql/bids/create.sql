CREATE TABLE bids (
    id              SERIAL      PRIMARY KEY,
    bid_amount      FLOAT       NOT NULL,
    bid_date        DATE        NOT NULL,
    bid_time        TIME        NOT NULL,
    winning_bid     BOOLEAN,
    user_id         INT         references          USER(id)        NOT NULL,
    lot_id          INT         references          LOTS(id)        NOT NULL
);