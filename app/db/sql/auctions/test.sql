INSERT INTO auctions (id, auction_name, auction_desc, start_datetime, end_datetime) VALUES
    (DEFAULT, 'Test Auction 1', 'An auction of artwork 1.', '2018-05-01 12:00:00', '2018-06-01 12:00:00'),
    (DEFAULT, 'Test Auction 2', 'An auction of artwork 2.', '2018-07-01 12:00:00', '2018-08-01 12:00:00');


UPDATE auctions
SET start_timestamp =  '2018-03-01 12:00:00+00',
    end_timestamp = '2018-08-01 12:00:00+00'
WHERE id = 1;

UPDATE auctions
SET start_timestamp =  '2018-07-01 12:00:00+00',
    end_timestamp = '2018-08-01 12:00:00+00'
WHERE id = 2;


UPDATE auctions
SET auction_name = 'Classic Masterpieces',
    auction_desc = 'The 10 greatest works of art ever created. These works transcend time and culture to be cemented in art history.'
WHERE id = 1;

UPDATE auctions
SET auction_name = 'Modern and Contemporary Finds',
    auction_desc = 'Artworks from the 20th century and beyond, including abstraction. These works transcend the restrictions of our natural world.'
WHERE id = 2;