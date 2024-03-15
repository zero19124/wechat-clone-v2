to testflight
xcode>product>archive>organazor>distripute>testflight


dev build > testflight
eas build --profile development --platform ios
eas build --profile development --platform android


eas build --profile preview --platform android
eas build --profile preview --platform ios

prod
eas build --platform ios
eas build --platform android

eas local
npx eas build --profile development --platform ios --local
npx eas build --profile development --platform android --local
npx eas build --platform ios --local

npx eas build --profile preview --platform ios --local
npx eas build --profile preview --platform android --local


upa install
https://www.diawi.com/
https://stackoverflow.com/questions/66932515/how-to-generate-a-ipa-file-from-expo-build-and-sideload-on-to-real-device


Release apps with custom native code to production
eas build -p all

if  Execution failed for task ':react-native-view-shot:compileDebugLibraryResources'

cd android && ./gradlew clean


casting android
scrcpy

npm run ios --simulator=“iPhone 15 Pro”

npx expo-doctor
npx expo prebuild --clean
npx expo run:ios
npx expo run:android



 sudo  chown -R Zhuanz: node_modules/
 sudo  chown -R Zhuanz: ios/
 sudo  chown -R Zhuanz: ./
 sudo  chown -R Zhuanz: android/

 npx expo start --clear

 npx expo install --fix

<!-- google login  -->
<!-- GIDClientID 不用配  login useeffect的时候config动态配置 -->
<!-- !!! important  expo may generate it automatically with useless value!!! -->
 <key>GIDClientID</key>
  <string>475065706028-11egj47k01ej9juk2o892q5os4gehkbp.apps.googleusercontent.com</string>
  


  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>com.googleusercontent.apps.475065706028-11egj47k01ej9juk2o892q5os4gehkbp</string>
    </array>
  </dict>
  </array>


local.properties
sdk.dir=/Users/Zhuanz/Library/Android/sdk


