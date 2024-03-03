to testflight
xcode>product>archive>organazor>distripute>testflight


dev build > testflight
eas build --profile development --platform ios
eas build --profile development --platform android


eas build --profile preview --platform android

prod
eas build --platform ios
eas build --platform android

cd android && ./gradlew clean


casting android
scrcpy