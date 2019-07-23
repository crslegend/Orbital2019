/* eslint-disable no-loop-func */
import busStops from "./BusStopData";
import busRoutes from "./BusRoutesData";

class BusStopMap {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.AdjList = new Map();
    this.distance = new Map();
    this.p = new Map();
    this.path = [];
  }

  addVertex(v) {
    this.AdjList.set(v, []);
  }

  addEdge(v, e) {
    this.AdjList.get(v).push(e);
  }

  initSSSP(s) {
    for (let stop of this.AdjList.keys()) {
      this.distance.set(stop, 10000000);
      this.p.set(stop, -1);
    }
    this.path = [];
    this.distance.set(s, 0);
  }

  bfs(s) {
    this.initSSSP(s);
    var q = [];
    q.push(s);

    while (q.length !== 0) {
        var stop = q.shift();
        var adj = this.AdjList.get(stop);
        var distance = this.distance.get(stop);
        adj.forEach(v => {
            if (this.distance.get(v) === 10000000) {
                this.distance.set(v, distance+1);
                this.p.set(v, stop);
                q.push(v);
            }
        })
    } // end while 
  }

  backtrack(u) {
    if (u !== -1) {
        this.backtrack(this.p.get(u));
        this.path.push(u);
    } 
  }
}

const bsMap = new BusStopMap(busStops.length);

busStops.forEach(stop => {
  bsMap.addVertex(stop.name);
});

busRoutes.forEach(route => {
  for (var i = 0; i < route.route.length - 1; i++) {
    bsMap.addEdge(route.route[i], route.route[i + 1]);
  }
});

export default bsMap;
