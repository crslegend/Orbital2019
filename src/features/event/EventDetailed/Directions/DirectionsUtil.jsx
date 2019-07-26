import busStops from "./BusStopData";
import axios from "axios";

export const findNearestBusStop = latLng => {
  var distance = Math.sqrt(
    Math.pow(latLng.lat - busStops[0].lat, 2) +
      Math.pow(latLng.lng - busStops[0].lng, 2)
  );
  var busStop = busStops[0];
  for (var i = 1; i < busStops.length; i++) {
    let newDistance = Math.sqrt(
      Math.pow(latLng.lat - busStops[i].lat, 2) +
        Math.pow(latLng.lng - busStops[i].lng, 2)
    );
    if (newDistance < distance) {
      distance = newDistance;
      busStop = busStops[i];
    }
  }
  return busStop;
};

// returns shortest path of bus stops
export const getBusPath = (map, start, end) => {
  // compute 4 diff paths of permutations of user, event bus stops
  // and opposite bus stops if defined
  map.bfs(start.name);
  map.backtrack(end.name);
  var path = [...map.path];
  if (end.opposite) {
    map.bfs(start.name);
    map.backtrack(end.opposite.name);
    if (
      (map.path.length < path.length && map.path.length > 1) ||
      path.length === 1
    ) {
      path = [...map.path];
    }
  }
  if (start.opposite) {
    map.bfs(start.opposite.name);
    map.backtrack(end.name);
    if (
      (map.path.length < path.length && map.path.length > 1) ||
      path.length === 1
    ) {
      path = [...map.path];
    }
  }
  if (end.opposite && start.opposite) {
    map.bfs(start.opposite.name);
    map.backtrack(end.opposite.name);
    if (
      (map.path.length < path.length && map.path.length > 1) ||
      path.length === 1
    ) {
      path = [...map.path];
    }
  }
  console.log(path);
  return path;
};

// get array of bus stop info in path
export const getPathInfo = path => {
  var pathInfo = [];
  path.forEach(stop => {
    pathInfo.push(busStops.find(e => e.name === stop));
  });
  return pathInfo;
};

export const getBusInfo = (pathInfo, eventStop) => {
  var i = 0;
  var busInfo = [
    {
      stopName: pathInfo[0].caption,
      name: pathInfo[0].name,
      buses: pathInfo[0].buses,
      lat: pathInfo[0].lat,
      lng: pathInfo[0].lng,
      endName: ""
    }
  ];
  for (var j = 0; j < pathInfo.length - 1; j++) {
    if (pathInfo[j].caption !== "mid") {
      var busArr = compareArr(busInfo[i].buses, pathInfo[j].buses);
      if (busArr.length !== 0) {
        busInfo[i].buses = busArr;
      } else {
        let counter = 1;
        while (pathInfo[j - counter].caption === "mid") {
          counter++;
        }
        busInfo[i].endName = pathInfo[j - counter].caption;
        busInfo.push({
          stopName: pathInfo[j - counter].caption,
          name: pathInfo[j - counter].name,
          buses: pathInfo[j - counter].buses,
          lat: pathInfo[j - counter].lat,
          lng: pathInfo[j - counter].lng,
          endName: ""
        });
        i++;
      }
    }
  }
  busInfo[busInfo.length - 1].endName = eventStop.caption;

  return busInfo;
};

const compareArr = (arr1, arr2) => {
  var finalArr = [];
  arr1.forEach(e1 =>
    arr2.forEach(e2 => {
      if (e1 === e2) {
        finalArr.push(e1);
      }
    })
  );
  return finalArr;
};

// get array of latlng to render on google maps
const getLatLngArr = (maps, pathInfo) => {
  var arrLatLng = [];
  pathInfo.forEach(stop => {
    arrLatLng.push(new maps.LatLng(stop.lat, stop.lng));
  });
  return arrLatLng;
};

export const handleApiLoaded = (
  map,
  maps,
  pathInfo,
  inNus,
  userLatLng,
  eventLatLng
) => {
  var bounds = new maps.LatLngBounds();
  if (inNus && pathInfo) {
    // set bounds of map
    pathInfo.forEach(stop => {
      bounds.extend(new maps.LatLng(stop.lat, stop.lng));
    });
    map.fitBounds(bounds);

    // initialize values for snapToRoad function
    var pathValues = [];
    var arrLatLng = getLatLngArr(maps, pathInfo);
    arrLatLng.forEach(latlng => {
      pathValues.push(latlng.toUrlValue());
    });
    var path = pathValues.join("|");

    var snappedCoords = [];
    axios
      .get("https://roads.googleapis.com/v1/snapToRoads", {
        params: {
          interpolate: true,
          path: path,
          key: "AIzaSyA8jB-vlpj9lB0wvsFVXGqlQHflAGJGjMM"
        }
      })
      .then(data => {
        data.data.snappedPoints.forEach(snappedPoint => {
          snappedCoords.push({
            lat: snappedPoint.location.latitude,
            lng: snappedPoint.location.longitude
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        var busPath = new maps.Polyline({
          path: snappedCoords,
          geodesic: false,
          strokeColor: "#0080ff",
          strokeOpacity: 0.55,
          strokeWeight: 6
        });

        busPath.setMap(map);
      });
  } else {
    var directionsService = new maps.DirectionsService();
    var renderer = new maps.DirectionsRenderer();

    var start = new maps.LatLng(userLatLng.latitude, userLatLng.longitude);
    var end = new maps.LatLng(eventLatLng.lat, eventLatLng.lng);
    var request = {
      origin: start,
      destination: end,
      travelMode: "TRANSIT"
    };

    directionsService.route(request, (result, status) => {
      console.log(status);
      if (status === "OK") {
        renderer.setDirections(result);
      }
    });
    renderer.setMap(map);

    bounds.extend(start);
    bounds.extend(end);
    map.fitBounds(bounds);
  }
};
