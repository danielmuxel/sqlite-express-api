CREATE TABLE IF NOT EXISTS projects (
  id integer PRIMARY KEY NOT NULL,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id integer PRIMARY KEY NOT NULL,
  firstname text NOT NULL,
  lastname text NOT NULL,
  phone text,
  email text
);

CREATE TABLE IF NOT EXISTS addresses (
  id integer PRIMARY KEY NOT NULL,
  street text NOT NULL,
  postcode text NOT NULL,
  city text NOT NULL,
  country text NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_addresses (
  id integer PRIMARY KEY NOT NULL,
  customerId integer NOT NULL,
  addressId integer NOT NULL,
  FOREIGN KEY(customerId) REFERENCES customers(id)
  FOREIGN KEY(addressId) REFERENCES addresses(id)
);

INSERT INTO projects (name)
VALUES
('Projekt Ros Boesch'),
('Projekt Carla Kiefer'),
('Projekt Amalric Schlimme'),
('Projekt Herrick Wegener'),
('Projekt Wiebe Frei');

INSERT INTO customers (firstname, lastname, phone, email)
VALUES
('Ros', 'Boesch', '09194957508', 'ros.boesch@email.com'),
('Carla', 'Kiefer', '06502820528', 'carla.biefer@email.com'),
('Amalric', 'Schlimme', '02771556234', 'amalric.schlimme@email.com'),
('Herrick', 'Wegener', '07024322248', 'herrick.wegener@email.com'),
('Wiebe', 'Frei', '030999530', 'wiebe.frei@email.com');

INSERT INTO addresses (street, postcode, city, country)
VALUES
('Hochstrasse 78', '25966', 'Westerland', 'DE'),
('Kieler Strasse 49', '83246', 'Unterwössen', 'DE'),
('Eichendorffstr. 67', '88090', 'Immenstaad', 'DE'),
('Stuttgarter Platz 32', '63832', 'Sulzbach', 'DE'),
('Schönhauser Allee 11', '79848', 'Bonndorf', 'DE');

INSERT INTO customer_addresses (customerId, addressId)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);