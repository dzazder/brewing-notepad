CREATE TABLE pages (
    id PRIMARY KEY,
    label VARCHAR,
    src VARCHAR,
    parent INT,
    showInMenu BOOLEAN
);

INSERT INTO pages (id, label, src, parent, showInMenu)
VALUES (1, 'Main page', 'main.html', -1, true),
(2, 'Your batches', 'batches.html', -1, true),
(3, 'Calculators', 'calculators.html', -1, true),
(31, 'IBU Calculator', 'ibucalc.html', 3, true),
(32, 'Alcohol Calculator', 'volcalc.html', 3, true),
(21, 'Batch', 'batch.html', 2, false),
(22, 'New batch', 'newbatch.html', 2, true)