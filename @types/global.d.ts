

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// declare module '*.png';
// declare module 'numeral';
// declare module 'echarts/lib/coord/geo/geoSourceManager';
// declare module '*.jpg';
// declare module '*.jpeg';
// declare module '*.gif';
// declare module 'react-native-mopsdk';

// declare type TFormMode = 'edit' | 'view';
// declare type TSubmitType = 'SAVE' | 'SUBMIT';

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace ReactNavigation {
//     // eslint-disable-next-line @typescript-eslint/no-empty-interface
//     interface RootParamList {
//       push: any;
//     }
//   }
// }
