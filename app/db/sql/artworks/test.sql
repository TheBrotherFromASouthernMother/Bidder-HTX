/* TEST ENTRY */

INSERT INTO artworks VALUES (
    DEFAULT, 'Test Artwork', 2018, '12" x 12"', 'Acrylic on Canvas', '1st Edition', 'Your Mom', 'This artwork is cool.', 40000.00
);

INSERT INTO artworks VALUES (
    DEFAULT, 'Test Artwork 2', 2014, '1" x 2"', 'Oil on Canvas', '3rd Edition', 'My Mom', 'This artwork is really cool.', 4.00
);

/* UPDATE TEST ENTRY */

UPDATE artworks
SET title = 'Mona Lisa', year = 1506, dimensions = '77 cm × 53 cm (30 in × 21 in)', 
    materials = 'Oil on poplar panel', edition = '1st Edition', artist = 'Leonardo da Vinci', 
    detail_desc = 'The <i>Mona Lisa</i> is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci. The painting is thought to be a portrait of Lisa Gherardini, the wife of Francesco del Giocondo, and is in oil on a white Lombardy poplar panel. It had been believed to have been painted between 1503 and 1506; however, Leonardo may have continued working on it as late as 1517.', 
    fmv = 800000000.00,
    images = array_append(images, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg')
WHERE id = 1;


UPDATE artworks
SET title = 'Girl with a Pearl Earring', year = 1665, dimensions = '44.5 cm × 39 cm (17.5 in × 15 in)', 
    materials = 'Oil on canvas', edition = '1st Edition', artist = 'Johannes Vermeer', 
    detail_desc = '<i>Girl with a Pearl Earring</i> is an oil painting by Dutch Golden Age painter Johannes Vermeer. It is a tronie of a girl wearing a headscarf and a pearl earring.',
    fmv = 40000000.00,
    images = array_append(images, 'https://upload.wikimedia.org/wikipedia/commons/6/66/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg')
WHERE id = 2;


INSERT INTO artworks VALUES (
    DEFAULT, 'The Persistence of Memory', 1931, '9 1/2 in x 13 in (24.1 x 33 cm)', 'Oil on canvas', '1st Edition', 'Salvador Dalì', 
    'Dalì described his meticulously rendered works as "hand-painted dream photographs," and certainly, the melted watches that make their appearance in this Surrealist masterpiece have become familiar symbols of that moment when reverie seems to uncannily invade the everyday.',
    10000000.00
);

UPDATE artworks
SET images = array_append(images, 'https://media.timeout.com/images/103114201/1372/1029/image.jpg')
WHERE id = 3;

INSERT INTO artworks VALUES (
    DEFAULT, 'In the Snow', 1930, '9 3/8 x 12 3/8 in (23.6 x 31.4 cm)', 'Gouache, ink, and watercolor on paper', '1st Edition', 'Marc Chagall', 
    'Marc Chagall was born on July 7, 1887, in Vitebsk, Russia. From 1907 to 1910 he studied in Saint Petersburg, at the Imperial Society for the Protection of the Arts, and later with Léon Bakst.',
    1000000.00
);

UPDATE artworks
SET images = array_append(images, 'https://i0.wp.com/www.guggenheim.org/wp-content/uploads/1922/01/41.453_ph_web.jpg?w=870&zoom=2')
WHERE id = 4;