<!-- jackwang@microconnect.com
Mci@112 -->
cc.microconnect.chain


<!-- layout名字拼错 导致header无法显示 -->

2

集成 nativecss import '../../global.css'不能用 alias 不然导入没有效果 metro module.exports = withNativeWind(config, { input: "./global.css" });

3 IndexBar
<!-- 1 切换tab的时候还显示，3teleport的时候位置问题，2震动交互 (计算较多)-->  4 the water drop, how i rotate it without the text inside not rotating 5 scrollview滚动和gesture的滚动兼容  gesture滚动的时候用useref做标识 然后scrollview的onscroll禁用
4 install hermeienggine-erorr downgrade the pod version

pod install 找不到expo相关的包可以 expo doctor and npx expo install --check
5 notsup Unsupported platform for lightningcss-darwin-arm64@1.23.0: wanted {"os":"darwin","cpu":"arm64"} (current: {"os":"linux","cpu":"x64"})


!!!  npx expo run:ios --configuration Release  --device  without dev tool  20240202

pusher
presence-test  the channel-name must start with presence-

4
Pusher not working in production on Verce 
https://github.com/vercel/next.js/discussions/48433

5
command not found: i18next-parser. after install  i18next-parser    
use > npx i18next-parser

5
尝试 最开始 会有灰色边框 LinearGradient
6 如果路由找不到 但是路径没问题 可能是因为文件报错咯 导致没加载进去（example webrtc）

7webrtc 
   // let offer = new RTCSessionDescription(offerData.offer);
      await peer.setRemoteDescription(offerData.offer); 
  <!-- fix 多看别人代码 -->

8expo-location
  After expo-location, the docs said to do a rebuild. Just running npx expo run:ios wasn't enough, the native code had to be regenerated.

So,

Had a clean working directory by committing the work
Ran npx expo prebuild --clean
Finally, npx expo run:ios


# 优化
!!!! flickering fix
usecallback + memo 
usestate + render


when keyboad open the chatlist should be set diff height
 onLayout={(e) => {
          setTimeout(() => {
            reList.current?.scrollTo({ y: 2000 });
          }, 200);
          e.nativeEvent.layout.height;
          console.log(
            e.nativeEvent.layout.height,
            "e.nativeEvent.layout.height"
          );
        }}