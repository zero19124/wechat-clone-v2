# 1
modal 需要
  <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
  app/modal.tsx

  # 2
   Did you forget to add Reanimated Babel plugin in babel.config.js
   after adding react-native-reanimated/plugin  still throw this error adn
   to clear cache with npm start -- --reset-cache and it works
# 3
>  9 | import EXBarCodeScanner
     |        ^ no such module 'EXBarCodeScanner'    fix 》 pod install 
 <!-- 部署   -->
eas submit -p ios

# 4
pod install Error: EACCES: permission denied
fix ≥ sudo  chown -R Zhuanz: node_modules/

<!-- lightningcss-darwin-arm64 -->