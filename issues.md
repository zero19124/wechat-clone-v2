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

<!-- themeColor is null,  ThemeProvider没包到portalproveider  -->
          </ThemeProvider>


issue     >  handleBarCodeScanned this fn called after useeffect called 
 useEffect(() => {
    console.log(text, "ttt");
  }, [text]);   为什么 setText('xx'). useeffect 里拿不到最新的值？ 每次打印都是空的

  issue> 录音难点 点击的时候切换录音画面无法触发到panresponder
  发现触摸的同时改变state不会中断
  

  # 
    mockLocation.la = la;
              setMock(mockLocation);  如果是 setMock({...mockLocation})  那么 地址就被改了


# 11.0.0: CocoaPods could not find compatible versions for pod "ExpoAdapterGoogleSignIn"

go to github read the changes for the version.
https://github.com/react-native-google-signin/google-signin/releases/tag/v11.0.0

# voice play only trough earpiece
https://github.com/expo/expo/issues/9915

#android upload fail
set type : 'image/jpeg' cuz the android return jpeg but return jpg in ios