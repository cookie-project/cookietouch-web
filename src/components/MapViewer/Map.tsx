import { DofusMapViewer } from "@/components/MapViewer";
import { getMapData } from "@/utils/GetMaps";
import React, { Component } from "react";

interface IState {
  mapId: number;
  mapData: any;
}

class MapViewer extends Component<{}, IState> {
  public state: IState = { mapId: 88212247, mapData: null };

  public componentDidMount() {
    this.changeMap(88212247);
  }

  public render() {
    const { mapId, mapData } = this.state;
    if (!mapData) {
      return null;
    }

    return (
      <div>
        <input type="text" value={mapId} onChange={this.handleChange} />
        <DofusMapViewer data={mapData} />
      </div>
    );
  }

  private handleChange = (event: any) => {
    const mapId = parseInt(event.target.value, 10);
    this.setState({ mapId });
    this.changeMap(mapId);
  };

  private changeMap(mapId: number) {
    getMapData(mapId).then(mapData => {
      if (!mapData) {
        return;
      }
      this.setState({ mapData });
    });
  }
}

export default MapViewer;
