CREATE TABLE auctions (
    id              SERIAL      PRIMARY KEY,
    auction_name    VARCHAR     NOT NULL,
    start_date      DATE        NOT NULL,
    start_time      TIME        NOT NULL,
    end_date        DATE        NOT NULL,
    end_time        TIME        NOT NULL,
    admin_id        INT         references          USER(id)        NOT NULL
);