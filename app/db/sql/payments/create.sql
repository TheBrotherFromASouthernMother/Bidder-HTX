CREATE TABLE payments (
    id                  SERIAL      PRIMARY KEY,
    amount              FLOAT       NOT NULL,
    payment_timestamp   TIMESTAMP   NOT NULL,
    user_id             INT         references          USERS(id)       NOT NULL,
    bid_id              INT         references          BIDS(id)        NOT NULL
);