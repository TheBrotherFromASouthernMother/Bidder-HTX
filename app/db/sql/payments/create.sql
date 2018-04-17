CREATE TABLE payments (
    id              SERIAL      PRIMARY KEY,
    amount          FLOAT       NOT NULL,
    payment_date    DATE        NOT NULL,
    payment_time    TIME,
    user_id         INT         references          USERS(id)       NOT NULL,
    bid_id          INT         references          BIDS(id)        NOT NULL
);