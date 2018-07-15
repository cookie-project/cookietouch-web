import { mapStyles } from "@/components/Map/styles";
import { IMapProps, IMapState, MapProps } from "@/components/Map/types";
import MapViewer from "@/components/MapViewer/Map";
import withStyles from "@material-ui/core/styles/withStyles";
// import { LatLng } from "leaflet";
import * as React from "react";
// import { Map as LeafMap, Marker, Popup, TileLayer } from "react-leaflet";

// const position: LatLng = new LatLng(0, 0);

class Map extends React.Component<MapProps, IMapState> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MapViewer />
        {/*<LeafMap center={position} zoom={1}>
          <TileLayer url="./maps/1/{x}/{y}.jpg" />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup.<br />Easily customizable.
            </Popup>
          </Marker>
    </LeafMap>*/}
      </div>
    );
  }
}

export default withStyles(mapStyles)<IMapProps>(Map);
