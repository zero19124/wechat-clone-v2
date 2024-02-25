import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

class Video extends Component {
  constructor(props) {
    super(props)
    // this.state = {}
  }

  // componentDidMount() {
  //   if (this.props.videoStream) {
  //     this.video.streamURL = this.props.videoStream
  //   }
  // }

  // componentWillReceiveProps(nextProps) { 
  //   console.log(nextProps.videoStream)

  //   if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
  //     this.video.streamURL = nextProps.videoStream
  //   }
  // }

  render() {
    const {
      // key,
      zOrder,
      objectFit,
      style,
      streamURL
    } = this.props

    const _streamURL = streamURL && streamURL.toURL()

    return (
      <View>
        <RTCView
          // key={key}
          zOrder={zOrder}
          objectFit={objectFit}
          style={{ ...style }}
          streamURL={_streamURL}
        />
      </View>
    )
  }
}

export default Video