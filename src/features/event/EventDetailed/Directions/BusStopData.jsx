const busStops = [
    {
      caption: "29 Heng Mui Keng Terrace",
      lat: 1.29058802127838,
      lng: 103.777565002441,
      name: "29 Heng Mui Keng Terrace"
    },
    {
      caption: "AS5",
      lat: 1.2936110496521,
      lng: 103.771942138672,
      name: "AS7"
    },
    {
      caption: "BIZ 2",
      lat: 1.29359996318817,
      lng: 103.775199890137,
      name: "BIZ2"
    },
    {
      caption: "Block S17",
      lat: 1.29749277004935,
      lng: 103.781328886747,
      name: "S17"
    },
    {
      caption: "Carpark 11, BIZ2",
      lat: 1.2957033383933,
      lng: 103.77459859848,
      name: "PGP12-OPP"
    },
    {
      caption: "Central Library",
      lat: 1.29649996757507,
      lng: 103.772399902344,
      name: "CENLIB"
    },
    {
      caption: "College Green",
      lat: 1.32333302497864,
      lng: 103.816307067871,
      name: "CGH"
    },
    {
      caption: "COM2",
      lat: 1.29416704177856,
      lng: 103.773612976074,
      name: "COM2"
    },
    {
      caption: "EA",
      lat: 1.30040001869202,
      lng: 103.77010345459,
      name: "BLK-EA-OPP"
    },
    {
      caption: "Information Technology",
      lat: 1.29737591743469,
      lng: 103.772850036621,
      name: "COMCEN"
    },
    {
      caption: "innovation 4.0",
      lat: 1.2941620349884,
      lng: 103.775863647461,
      name: "innovation 4.0"
    },
    {
      caption: "Kent Ridge Bus Terminal",
      lat: 1.29416704177856,
      lng: 103.769721984863,
      name: "KR-BT"
    },
    {
      caption: "Kent Ridge Bus Terminal (E)",
      lat: 1.29460000991821,
      lng: 103.769798278809,
      name: "KR-BTE"
    },
    {
      caption: "Kent Ridge Bus Terminal End",
      lat: 1.29470002651215,
      lng: 103.769798278809,
      name: "KTR-EN"
    },
    {
      caption: "Kent Ridge MRT",
      lat: 1.29379999637604,
      lng: 103.784896850586,
      name: "KR-MRT"
    },
    {
      caption: "Kent Vale",
      lat: 1.30209994316101,
      lng: 103.769096374512,
      name: "KV"
    },
    {
      caption: "LT13",
      lat: 1.29477859091277,
      lng: 103.770588576794,
      name: "LT13"
    },
    {
      caption: "LT27",
      lat: 1.29739999771118,
      lng: 103.780899047852,
      name: "LT27"
    },
    {
      caption: "Museum",
      lat: 1.30110192298889,
      lng: 103.77367401123,
      name: "MUSEUM"
    },
    {
      caption: "Opp HSSML",
      lat: 1.29277801513672,
      lng: 103.775001525879,
      name: "HSSML-OPP"
    },
    {
      caption: "Opp Kent Ridge MRT",
      lat: 1.2936999797821,
      lng: 103.785102844238,
      name: "KR-MRT-OPP"
    },
    {
      caption: "Opp NUSS",
      lat: 1.29330003261566,
      lng: 103.772399902344,
      name: "NUSS-OPP"
    },
    {
      caption: "Opp TCOMS",
      lat: 1.29379999637604,
      lng: 103.777000427246,
      name: "PGP12-OPP"
    },
    {
      caption: "Opp UHall",
      lat: 1.29750001430511,
      lng: 103.778198242188,
      name: "UHALL-OPP"
    },
    {
      caption: "Opp University Hall",
      lat: 1.29748258441666,
      lng: 103.778133809567,
      name: "UHALL-OPP"
    },
    {
      caption: "Opp University Health Centre",
      lat: 1.29879999160767,
      lng: 103.775497436523,
      name: "STAFFCLUB-OPP"
    },
    {
      caption: "Opp YIH",
      lat: 1.29898205452454,
      lng: 103.774200379848,
      name: "YIH-OPP"
    },
    {
      caption: "PGP Hse 15",
      lat: 1.29305601119995,
      lng: 103.777778625488,
      name: "PGP14-15"
    },
    {
      caption: "PGP Hse 7",
      lat: 1.29320001602173,
      lng: 103.777801513672,
      name: "PGP7"
    },
    {
      caption: "PGPR",
      lat: 1.29083299636841,
      lng: 103.780830383301,
      name: "PGP"
    },
    {
      caption: "Prince George's Park",
      lat: 1.29194402694702,
      lng: 103.7802734375,
      name: "PGPT"
    },
    {
      caption: "Raffles Hall",
      lat: 1.30102869529789,
      lng: 103.772705554962,
      name: "RAFFLES"
    },
    {
      caption: "S17",
      lat: 1.29747665891241,
      lng: 103.781354546547,
      name: "S17"
    },
    {
      caption: "TCOMS",
      lat: 1.29370222151434,
      lng: 103.776525914669,
      name: "PGP12"
    },
    {
      caption: "UHall",
      lat: 1.29741770235361,
      lng: 103.778062582016,
      name: "UHALL"
    },
    {
      caption: "University Hall",
      lat: 1.29746512839666,
      lng: 103.777998894453,
      name: "UHALL"
    },
    {
      caption: "University Health Centre",
      lat: 1.2989000082016,
      lng: 103.77612015605,
      name: "STAFFCLUB"
    },
    {
      caption: "University Town",
      lat: 1.30357886193758,
      lng: 103.774490177631,
      name: "UTown"
    },
    {
      caption: "Ventus (Opp LT13)",
      lat: 1.29530000686646,
      lng: 103.770599365234,
      name: "LT13-OPP"
    },
    {
      caption: "YIH",
      lat: 1.29869997501373,
      lng: 103.774299621582,
      name: "YIH"
    }
  ];

  export default busStops;