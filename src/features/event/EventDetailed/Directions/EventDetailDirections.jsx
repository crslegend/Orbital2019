import React from "react";
import { Segment } from "semantic-ui-react";

const busStops = {
  BusStopsResult: {
    busstops: [
      {
        caption: "29 Heng Mui Keng Terrace",
        latitude: 1.29058802127838,
        longitude: 103.777565002441,
        name: "29 Heng Mui Keng Terrace"
      },
      {
        caption: "AS5",
        latitude: 1.2936110496521,
        longitude: 103.771942138672,
        name: "AS7"
      },
      {
        caption: "BIZ 2",
        latitude: 1.29359996318817,
        longitude: 103.775199890137,
        name: "BIZ2"
      },
      {
        caption: "Block S17",
        latitude: 1.29749277004935,
        longitude: 103.781328886747,
        name: "S17"
      },
      {
        caption: "Botanic Gardens MRT",
        latitude: 1.32270002365112,
        longitude: 103.815101623535,
        name: "BG-MRT"
      },
      {
        caption: "BTC - Oei Tiong Ham Building",
        latitude: 1.31974358180187,
        longitude: 103.817929506302,
        name: "BUKITTIMAH-BTC2"
      },
      {
        caption: "Carpark 11, BIZ2",
        latitude: 1.2957033383933,
        longitude: 103.77459859848,
        name: "PGP12-OPP"
      },
      {
        caption: "Central Library",
        latitude: 1.29649996757507,
        longitude: 103.772399902344,
        name: "CENLIB"
      },
      {
        caption: "College Green",
        latitude: 1.32333302497864,
        longitude: 103.816307067871,
        name: "CGH"
      },
      {
        caption: "COM2",
        latitude: 1.29416704177856,
        longitude: 103.773612976074,
        name: "COM2"
      },
      {
        caption: "EA",
        latitude: 1.30040001869202,
        longitude: 103.77010345459,
        name: "BLK-EA-OPP"
      },
      {
        caption: "Information Technology",
        latitude: 1.29737591743469,
        longitude: 103.772850036621,
        name: "COMCEN"
      },
      {
        caption: "innovation 4.0",
        latitude: 1.2941620349884,
        longitude: 103.775863647461,
        name: "innovation 4.0"
      },
      {
        caption: "Kent Ridge Bus Terminal",
        latitude: 1.29416704177856,
        longitude: 103.769721984863,
        name: "KR-BT"
      },
      {
        caption: "Kent Ridge Bus Terminal (E)",
        latitude: 1.29460000991821,
        longitude: 103.769798278809,
        name: "KR-BTE"
      },
      {
        caption: "Kent Ridge Bus Terminal End",
        latitude: 1.29470002651215,
        longitude: 103.769798278809,
        name: "KTR-EN"
      },
      {
        caption: "Kent Ridge MRT",
        latitude: 1.29379999637604,
        longitude: 103.784896850586,
        name: "KR-MRT"
      },
      {
        caption: "Kent Vale",
        latitude: 1.30209994316101,
        longitude: 103.769096374512,
        name: "KV"
      },
      {
        caption: "LT13",
        latitude: 1.29477859091277,
        longitude: 103.770588576794,
        name: "LT13"
      },
      {
        caption: "LT27",
        latitude: 1.29739999771118,
        longitude: 103.780899047852,
        name: "LT27"
      },
      {
        caption: "Museum",
        latitude: 1.30110192298889,
        longitude: 103.77367401123,
        name: "MUSEUM"
      },
      {
        caption: "Opp HSSML",
        latitude: 1.29277801513672,
        longitude: 103.775001525879,
        name: "HSSML-OPP"
      },
      {
        caption: "Opp Kent Ridge MRT",
        latitude: 1.2936999797821,
        longitude: 103.785102844238,
        name: "KR-MRT-OPP"
      },
      {
        caption: "Opp NUSS",
        latitude: 1.29330003261566,
        longitude: 103.772399902344,
        name: "NUSS-OPP"
      },
      {
        caption: "Opp TCOMS",
        latitude: 1.29379999637604,
        longitude: 103.777000427246,
        name: "PGP12-OPP"
      },
      {
        caption: "Opp UHall",
        latitude: 1.29750001430511,
        longitude: 103.778198242188,
        name: "UHALL-OPP"
      },
      {
        caption: "Opp University Hall",
        latitude: 1.29748258441666,
        longitude: 103.778133809567,
        name: "UHALL-OPP"
      },
      {
        caption: "Opp University Health Centre",
        latitude: 1.29879999160767,
        longitude: 103.775497436523,
        name: "STAFFCLUB-OPP"
      },
      {
        caption: "Opp YIH",
        latitude: 1.29898205452454,
        longitude: 103.774200379848,
        name: "YIH-OPP"
      },
      {
        caption: "PGP Hse 15",
        latitude: 1.29305601119995,
        longitude: 103.777778625488,
        name: "PGP14-15"
      },
      {
        caption: "PGP Hse 7",
        latitude: 1.29320001602173,
        longitude: 103.777801513672,
        name: "PGP7"
      },
      {
        caption: "PGPR",
        latitude: 1.29083299636841,
        longitude: 103.780830383301,
        name: "PGP"
      },
      {
        caption: "Prince George's Park",
        latitude: 1.29194402694702,
        longitude: 103.7802734375,
        name: "PGPT"
      },
      {
        caption: "Raffles Hall",
        latitude: 1.30102869529789,
        longitude: 103.772705554962,
        name: "RAFFLES"
      },
      {
        caption: "S17",
        latitude: 1.29747665891241,
        longitude: 103.781354546547,
        name: "S17"
      },
      {
        caption: "TCOMS",
        latitude: 1.29370222151434,
        longitude: 103.776525914669,
        name: "PGP12"
      },
      {
        caption: "The Japanese Primary School",
        latitude: 1.30073094367981,
        longitude: 103.769973754883,
        name: "JP-SCH-16151"
      },
      {
        caption: "UHall",
        latitude: 1.29741770235361,
        longitude: 103.778062582016,
        name: "UHALL"
      },
      {
        caption: "University Hall",
        latitude: 1.29746512839666,
        longitude: 103.777998894453,
        name: "UHALL"
      },
      {
        caption: "University Health Centre",
        latitude: 1.2989000082016,
        longitude: 103.77612015605,
        name: "STAFFCLUB"
      },
      {
        caption: "University Town",
        latitude: 1.30357886193758,
        longitude: 103.774490177631,
        name: "UTown"
      },
      {
        caption: "Ventus (Opp LT13)",
        latitude: 1.29530000686646,
        longitude: 103.770599365234,
        name: "LT13-OPP"
      },
      {
        caption: "YIH",
        latitude: 1.29869997501373,
        longitude: 103.774299621582,
        name: "YIH"
      }
    ]
  }
};

const EventDetailDirections = ({ lat, lng }) => {
  return <Segment attached />;
};

export default EventDetailDirections;
