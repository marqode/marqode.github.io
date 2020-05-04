import React from "react";
import * as SpotifyApi from "./spotify/spotifyApi";
import SinesthesiaContent from "./sinesthesiaContent";
import hash from "./spotify/hash";

class Sinesthesia extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      items: [],
      track: null,
      features: null,
    };
  }

  async componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      console.log("token=" + _token);
      this.setState({
        token: _token,
      });
      this.getData(_token);
      // const data = await SpotifyApi.getData(_token);
      // this.setState({
      //   track: data.item,
      // });
      // console.log("track name: " + data.item.name);
      // this.displayTrackFeatures();
      // } else {
      //   SpotifyApi.getToken();
    }
  }

  async getData(token) {
    try {
      let newData = await SpotifyApi.getCurrentlyPlaying(token);
      this.setState({
        track: newData.item,
      });
      this.displayTrackFeatures();
    } catch (e) {
      try {
        let newData = await SpotifyApi.getLastPlayed(token);
        this.setState({
          track: newData.items[0].track,
        });
        this.displayTrackFeatures();
      } catch (e) {
        console.log("Get Data failed with error: " + e);
      }
    }
  }

  async displayTrackFeatures() {
    let features = await SpotifyApi.getTrackFeatures(
      this.state.token,
      this.state.track.id
    );
    // Object.keys(features).map((key) => {
    this.setState({
      features,
    });
    // });
  }

  render() {
    return (
      <SinesthesiaContent
        track={this.state.track}
        features={this.state.features}
        getToken={() =>
          this.state.token ? this.getData() : SpotifyApi.getToken()
        }
      />
    );
  }
}

export default Sinesthesia;
