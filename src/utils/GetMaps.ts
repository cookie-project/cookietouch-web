import axios from "axios";

const ASSETS_ROOT_URL =
  "https://ankama.akamaized.net/games/dofus-tablette/assets/2.21.2";

/*
getAllMaps('88212247', 100)
  .then(data => {
    console.log(data.map(m => m.id));
  });
*/

export async function getAllMaps(startMapId: number, maxNumberOfMaps: number) {
  // Queue of map ids awaiting to be visited (breadth-first search)
  const pendingQueue = [startMapId];
  // List of maps that have been visited
  const visited: any[] = [];

  while (pendingQueue.length > 0 && visited.length < maxNumberOfMaps) {
    // Pop a map id from the top of the queue
    const headMapId: number = pendingQueue.shift()!;
    // Fetch the data for that map
    const mapData = await getMapData(headMapId);

    if (mapData !== null) {
      mapData.neighbourIds.forEach((neighbourId: any) => {
        if (
          pendingQueue.indexOf(neighbourId) === -1 &&
          !visited.some(m => m.id === neighbourId)
        ) {
          pendingQueue.push(neighbourId);
        }
      });
      visited.push(mapData);
    }
  }

  return visited;
}

export async function getMapData(mapId: number) {
  return axios
    .get(`${ASSETS_ROOT_URL}/maps/${mapId}.json`)
    .then(response => {
      return {
        ...response.data,
        neighbourIds: [
          response.data.leftNeighbourId,
          response.data.rightNeighbourId,
          response.data.topNeighbourId,
          response.data.bottomNeighbourId
        ]
      };
    })
    .catch(() => null);
}
