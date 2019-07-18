const busStops = [
  {
    caption: "AS5",
    lat: 1.2936110496521,
    lng: 103.771942138672,
    name: "AS7",
    buses: ["A1", "D1", "B1"],
    opposite: {
      caption: "Opp NUSS",
      lat: 1.29330003261566,
      lng: 103.772399902344,
      name: "NUSS-OPP",
      buses: ["A2", "D1", "B2"]
    }
  },
  {
    caption: "BIZ 2",
    lat: 1.29359996318817,
    lng: 103.775199890137,
    name: "BIZ2",
    buses: ["A1", "D1", "B1", "A1E"],
    opposite: {
      caption: "Opp HSSML",
      lat: 1.29277801513672,
      lng: 103.775001525879,
      name: "HSSML-OPP",
      buses: ["A2", "D1", "B2"]
    }
  },
  {
    caption: "Central Library",
    lat: 1.29649996757507,
    lng: 103.772399902344,
    name: "CENLIB",
    buses: ["A1", "D1", "B1", "A1E"],
    opposite: {
      caption: "Information Technology",
      lat: 1.29737591743469,
      lng: 103.772850036621,
      name: "COMCEN",
      buses: ["A2", "D1", "B1", "B2", "A2E"]
    }
  },
  {
    caption: "COM2",
    lat: 1.29416704177856,
    lng: 103.773612976074,
    name: "COM2",
    buses: ["A1", "A2", "D1u", "D1b"]
  },
  {
    caption: "EA",
    lat: 1.30040001869202,
    lng: 103.77010345459,
    name: "BLK-EA-OPP",
    buses: ["B2", "C"],
    opposite: {
      caption: "The Japanese Primary School",
      latitude: 1.30073094367981,
      longitude: 103.769973754883,
      name: "JP-SCH-16151",
      buses: ["C"]
    }
  },
  {
    caption: "Information Technology",
    lat: 1.29737591743469,
    lng: 103.772850036621,
    name: "COMCEN",
    buses: ["A2", "D1", "B1", "B2", "A2E"],
    opposite: {
      caption: "Central Library",
      lat: 1.29649996757507,
      lng: 103.772399902344,
      name: "CENLIB",
      buses: ["A1", "D1", "B1", "A1E"]
    }
  },
  {
    caption: "Kent Ridge Bus Terminal",
    lat: 1.29416704177856,
    lng: 103.769721984863,
    name: "KR-BT",
    buses: ["B1", "C"]
  },
  {
    caption: "Kent Ridge MRT",
    lat: 1.29379999637604,
    lng: 103.784896850586,
    name: "KR-MRT",
    buses: ["A1", "D2", "A1E"],
    opposite: {
      caption: "Opp Kent Ridge MRT",
      lat: 1.2936999797821,
      lng: 103.785102844238,
      name: "KR-MRT-OPP",
      buses: ["A2", "D2", "A2E"]
    }
  },
  {
    caption: "Kent Vale",
    lat: 1.30209994316101,
    lng: 103.769096374512,
    name: "KV",
    buses: ["C"]
  },
  {
    caption: "LT13",
    lat: 1.29477859091277,
    lng: 103.770588576794,
    name: "LT13",
    buses: ["A1", "D1", "B1"],
    opposite: {
      caption: "Ventus (Opp LT13)",
      lat: 1.29530000686646,
      lng: 103.770599365234,
      name: "LT13-OPP",
      buses: ["A2", "D1", "A2E", "B2"]
    }
  },
  {
    caption: "LT27",
    lat: 1.29739999771118,
    lng: 103.780899047852,
    name: "LT27",
    buses: ["A1", "D2", "C", "A1E"],
    opposite: {
      caption: "S17",
      lat: 1.29747665891241,
      lng: 103.781354546547,
      name: "S17",
      buses: ["A2", "D2", "A2E", "C"]
    }
  },
  {
    caption: "Museum",
    lat: 1.30110192298889,
    lng: 103.77367401123,
    name: "MUSEUM",
    buses: ["A2", "D1", "D2", "B1", "C"],
    opposite: {
      caption: "Raffles Hall",
      lat: 1.30102869529789,
      lng: 103.772705554962,
      name: "RAFFLES",
      buses: ["B2", "C"]
    }
  },
  {
    caption: "Opp HSSML",
    lat: 1.29277801513672,
    lng: 103.775001525879,
    name: "HSSML-OPP",
    buses: ["A2", "D1", "B2"],
    opposite: {
      caption: "BIZ 2",
      lat: 1.29359996318817,
      lng: 103.775199890137,
      name: "BIZ2",
      buses: ["A1", "D1", "B1", "A1E"]
    }
  },
  {
    caption: "Opp Kent Ridge MRT",
    lat: 1.2936999797821,
    lng: 103.785102844238,
    name: "KR-MRT-OPP",
    buses: ["A2", "D2", "A2E"],
    opposite: {
      caption: "Kent Ridge MRT",
      lat: 1.29379999637604,
      lng: 103.784896850586,
      name: "KR-MRT",
      buses: ["A1", "D2", "A1E"]
    }
  },
  {
    caption: "Opp NUSS",
    lat: 1.29330003261566,
    lng: 103.772399902344,
    name: "NUSS-OPP",
    buses: ["A2", "D1", "B2"],
    opposite: {
      caption: "AS5",
      lat: 1.2936110496521,
      lng: 103.771942138672,
      name: "AS7",
      buses: ["A1", "D1", "B1"]
    }
  },
  {
    caption: "Opp TCOMS",
    lat: 1.29379999637604,
    lng: 103.777000427246,
    name: "PGP12-OPP",
    buses: ["A1", "D2"],
    opposite: {
      caption: "TCOMS",
      lat: 1.29370222151434,
      lng: 103.776525914669,
      name: "PGP12",
      buses: ["A2", "D2"]
    }
  },
  {
    caption: "Opp UHall",
    lat: 1.29750001430511,
    lng: 103.778198242188,
    name: "UHALL-OPP",
    buses: ["A2", "D2", "C"],
    opposite: {
      caption: "UHall",
      lat: 1.29741770235361,
      lng: 103.778062582016,
      name: "UHALL",
      buses: ["A1", "D2", "C"]
    }
  },
  {
    caption: "Opp University Health Centre",
    lat: 1.29879999160767,
    lng: 103.775497436523,
    name: "STAFFCLUB-OPP",
    buses: ["A1", "D2", "A1E", "C"],
    opposite: {
      caption: "University Health Centre",
      lat: 1.2989000082016,
      lng: 103.77612015605,
      name: "STAFFCLUB",
      buses: ["A2", "D2", "C"]
    }
  },
  {
    caption: "Opp YIH",
    lat: 1.29898205452454,
    lng: 103.774200379848,
    name: "YIH-OPP",
    buses: ["A2", "D1", "B1", "B2"],
    opposite: {
      caption: "YIH",
      lat: 1.29869997501373,
      lng: 103.774299621582,
      name: "YIH",
      buses: ["A1", "D1", "B1"]
    }
  },
  {
    caption: "PGP Hse 15",
    lat: 1.29305601119995,
    lng: 103.777778625488,
    name: "PGP14-15",
    buses: ["A2"],
    opposite: {
      caption: "PGP Hse 7",
      lat: 1.29320001602173,
      lng: 103.777801513672,
      name: "PGP7",
      buses: ["A1"]
    }
  },
  {
    caption: "PGP Hse 7",
    lat: 1.29320001602173,
    lng: 103.777801513672,
    name: "PGP7",
    buses: ["A1"],
    opposite: {
      caption: "PGP Hse 15",
      lat: 1.29305601119995,
      lng: 103.777778625488,
      name: "PGP14-15",
      buses: ["A2"]
    }
  },
  {
    caption: "PGPR",
    lat: 1.29083299636841,
    lng: 103.780830383301,
    name: "PGP",
    buses: ["D2"],
    opposite: {
      caption: "Prince George's Park",
      lat: 1.29194402694702,
      lng: 103.7802734375,
      name: "PGPT",
      buses: ["A1", "A2", "D2", "A1E"]
    }
  },
  {
    caption: "Prince George's Park",
    lat: 1.29194402694702,
    lng: 103.7802734375,
    name: "PGPT",
    buses: ["A1", "A2", "D2", "A1E"]
  },
  {
    caption: "Raffles Hall",
    lat: 1.30102869529789,
    lng: 103.772705554962,
    name: "RAFFLES",
    buses: ["B2", "C"],
    opposite: {
      caption: "Museum",
      lat: 1.30110192298889,
      lng: 103.77367401123,
      name: "MUSEUM",
      buses: ["A2", "D1", "D2", "B1", "C"]
    }
  },
  {
    caption: "S17",
    lat: 1.29747665891241,
    lng: 103.781354546547,
    name: "S17",
    buses: ["A2", "D2", "A2E", "C"],
    opposite: {
      caption: "LT27",
      lat: 1.29739999771118,
      lng: 103.780899047852,
      name: "LT27",
      buses: ["A1", "D2", "C", "A1E"]
    }
  },
  {
    caption: "TCOMS",
    lat: 1.29370222151434,
    lng: 103.776525914669,
    name: "PGP12",
    buses: ["A2", "D2"],
    opposite: {
      caption: "Opp TCOMS",
      lat: 1.29379999637604,
      lng: 103.777000427246,
      name: "PGP12-OPP",
      buses: ["A1", "D2"]
    }
  },
  {
    caption: "The Japanese Primary School",
    latitude: 1.30073094367981,
    longitude: 103.769973754883,
    name: "JP-SCH-16151",
    buses: ["C"],
    opposite: {
      caption: "EA",
      lat: 1.30040001869202,
      lng: 103.77010345459,
      name: "BLK-EA-OPP",
      buses: ["B2", "C"]
    }
  },
  {
    caption: "UHall",
    lat: 1.29741770235361,
    lng: 103.778062582016,
    name: "UHALL",
    buses: ["A1", "D2", "C"],
    opposite: {
      caption: "Opp UHall",
      lat: 1.29750001430511,
      lng: 103.778198242188,
      name: "UHALL-OPP",
      buses: ["A2", "D2", "C"]
    }
  },
  {
    caption: "University Health Centre",
    lat: 1.2989000082016,
    lng: 103.77612015605,
    name: "STAFFCLUB",
    buses: ["A2", "D2", "C"],
    opposite: {
      caption: "Opp University Health Centre",
      lat: 1.29879999160767,
      lng: 103.775497436523,
      name: "STAFFCLUB-OPP",
      buses: ["A1", "D2", "A1E", "C"]
    }
  },
  {
    caption: "University Town",
    lat: 1.30357886193758,
    lng: 103.774490177631,
    name: "UTown",
    buses: ["D1", "D2", "B1", "B2", "Cs", "Ckr"]
  },
  {
    caption: "Ventus (Opp LT13)",
    lat: 1.29530000686646,
    lng: 103.770599365234,
    name: "LT13-OPP",
    buses: ["A2", "D1", "A2E", "B2"],
    opposite: {
      caption: "LT13",
      lat: 1.29477859091277,
      lng: 103.770588576794,
      name: "LT13",
      buses: ["A1", "D1", "B1"]
    }
  },
  {
    caption: "YIH",
    lat: 1.29869997501373,
    lng: 103.774299621582,
    name: "YIH",
    buses: ["A1", "D1", "B1"],
    opposite: {
      caption: "Opp YIH",
      lat: 1.29898205452454,
      lng: 103.774200379848,
      name: "YIH-OPP",
      buses: ["A2", "D1", "B1", "B2"]
    }
  }
];

export default busStops;
