INSERT INTO
    `material` (`ID`, `material`)
VALUES
    ('1', 'Baumwolle'),
    ('2', 'Polyester'),
    ('3', 'Viskose'),
    ('4', 'Merinowolle'),
    ('5', 'Schurwolle');

INSERT INTO
    `status` (`ID`, `status`)
VALUES
    ('1', 'sauber'),
    ('2', 'okay'),
    ('3', 'schmutzig');

INSERT INTO
    `washing_mode` (`ID`, `washing_mode`)
VALUES
    ('1', '40 Grad Normalwäsche bunt'),
    ('2', '30 Grad Feinwäsche dunkel');

INSERT INTO
    `weather` (`ID`, `weather`)
VALUES
    ('1', 'sonnig'),
    ('2', 'bewölkt'),
    ('3', 'Regen'),
    ('4', 'Schnee');

INSERT INTO
    `category` (`ID`, `type`)
VALUES
    ('1', 'Oberteile'),
    ('2', 'Hosen'),
    ('3', 'Röcke'),
    ('4', 'Accessoires');

INSERT INTO
    `brand` (`ID`, `name`)
VALUES
    (1, 'Asos'),
    (2, 'H&M');

INSERT INTO
    `occasion` (`ID`, `occasion`)
VALUES
    ('1', 'Arbeit'),
    ('2', 'Zuhause'),
    ('3', 'Party');