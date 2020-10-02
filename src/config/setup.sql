DROP TABLE IF EXISTS clubes;

CREATE TABLE IF NOT EXISTS clubes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  short_name TEXT NOT NULL,
  tla TEXT NOT NULL,
  crest_url TEXT,
  'address' TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT NOT NULL,
  email TEXT NOT NULL,
  founded INTEGER NOT NULL,
  club_colors TEXT NOT NULL,
  venue TEXT NOT NULL,
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);

INSERT INTO clubes 
  (name, short_name, tla, crest_url, address, phone, website, email, founded, club_colors, venue) 
VALUES
  ('Arsenal FC', 'Arsenal', 'ARS', 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', '75 Drayton Park London N5 1BU', '+44 (020) 76195003', 'http://www.arsenal.com', 'info@arsenal.co.uk', 1886, 'Red / White', 'Emirates Stadium'),
  ('Everton FC', 'Everton', 'EVE', 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg', 'Goodison Park Liverpool L4 4EL', '+44 (0871) 6631878', 'http://www.evertonfc.com', 'everton@evertonfc.com', 1878, 'Blue / White', 'Goodison Park'),
  ('Liverpool FC', 'Liverpool', 'LIV', 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', 'Anfield Road Liverpool L4 OTH', '+44 (0844) 4993000', 'http://www.liverpoolfc.tv', 'customercontact@liverpoolfc.tv', 1892, 'Red / White', 'Anfield'),
  ('Manchester City FC', 'Man City', 'MCI', 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', 'SportCity Manchester M11 3FF', '+44 (0870) 0621894', 'https://www.mancity.com', 'mancity@mancity.com', 1880,'Sky Blue / White', 'Etihad Stadium'),
  ('Manchester United FC', 'Man United', 'MUN', 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', 'Sir Matt Busby Way Manchester M16 0RA', '+44 (0161) 8688000', 'http://www.manutd.com', 'enquiries@manutd.co.uk', 1878, 'Red / White', 'Old Trafford'),
  ('Tottenham Hotspur FC', 'Tottenham', 'TOT', 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', 'Bill Nicholson Way, 748 High Road London N17 OAP', '+44 (0844) 4995000', 'http://www.tottenhamhotspur.com', 'customer.care@tottenhamhotspur.com', 1882, 'Navy Blue / White', 'Tottenham Hotspur Stadium'),
  ('Wolverhampton Wanderers FC', 'Wolverhampton', 'WOL', 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg', 'Waterloo Road Wolverhampton WV1 4QR', '+44 (0871) 2222220', 'http://www.wolves.co.uk', 'info@wolves.co.uk', 1877, 'Black / Gold', 'Molineux Stadium'),
  ('Burnley FC', 'Burnley', 'BUR', 'https://upload.wikimedia.org/wikipedia/en/6/62/Burnley_F.C._Logo.svg', 'Harry Potts Way Burnley BB10 4BX', '+44 (0871) 2211882', 'http://www.burnleyfootballclub.com', 'info@burnleyfc.com', 1881, 'Claret / Sky Blue', 'Turf Moor'),
  ('Crystal Palace FC', 'Crystal Palace', 'CRY', 'https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg', 'Whitehorse Lane London SE25 6PU', '+44 (020) 87686000', 'http://www.cpfc.co.uk', 'info@cpfc.co.uk', 1905, 'Red / Blue', 'Selhurst Park'),
  ('Brighton & Hove Albion FC', 'Brighton Hove', 'BHA', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg', '44 North Road Brighton & Hove BN1 1YR', '+44 (01273) 878288', 'http://www.seagulls.co.uk', 'seagulls@bhafc.co.uk', 1898, 'Blue / White', 'The American Express Community Stadium'),
  ('West Ham United FC', 'West Ham', 'WHU', 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg', 'Green Street, Upton Park London E13 9AZ', '+44 (020) 85482794', 'http://www.whufc.com', 'yourcomments@westhamunited.co.uk', 1895, 'Claret / Sky Blue', 'London Stadium'),
  ('AFC Bournemouth', 'Bournemouth', 'BOU', 'https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg', 'Dean Court, Kings Park Bournemouth BH7 7AF', '+44 (01202) 726300', 'http://www.afcb.co.uk', 'admin@afcb.co.uk', 1890, 'Red / Black', 'Vitality Stadium');