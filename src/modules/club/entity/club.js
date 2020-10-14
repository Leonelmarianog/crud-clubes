class Club {
  constructor({
    id,
    name,
    shortName,
    tla,
    area,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    createdAt,
    lastUpdated,
    fk_area_id: fkAreaId,
  }) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.tla = tla;
    this.area = area;
    this.crestUrl = crestUrl;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.email = email;
    this.founded = founded;
    this.clubColors = clubColors;
    this.venue = venue;
    this.createdAt = createdAt;
    this.lastUpdated = lastUpdated;
    this.fkAreaId = fkAreaId;
  }
}

module.exports = Club;
