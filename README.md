# Use MobileFirst Foundation 8.0 with React Native-based applications

The purpose of this sample is to show you how you can run [React Native](https://facebook.github.io/react-native/) project with MobileFirst foundation Server and SDKs.

## Demo

## Prerequisites
* [Pre-installed React Native](https://facebook.github.io/react-native/docs/getting-started.html).
* [Pre-installed IBM MobileFirst Platform development environment](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/setting-up-your-development-environment/).
* [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
* [Install NodeJS / npm](https://docs.npmjs.com/getting-started/installing-node).
* [Install the latest Android Studio](https://developer.android.com/studio/install.html)
* [Install the latest XCode](https://developer.apple.com/download/)

> Link to MobileFirst Foundation 8.0 And React Native sample in the [following link](https://github.com/mfpdev/mf-foundation-and-react-native)  

## Running the sample

- Clone this [Git repository](https://github.com/mfpdev/mf-foundation-and-react-native).

  ```
  git clone https://github.com/mfpdev/mf-foundation-and-react-native
  ```
- From the cloned project install dependencies by run `npm install` from terminal window.

- Register the app/s (iOS/Android) in MobileFirst Foundation Server.

  - From each platform folder in the project ([ios](./ios)/[Android](./android)) run the following bash command:
  ```
  mfpdev app register
  ```
  > For iOS use the following (in case you didn't change it in XCode):
    - For bundleId - *com.github.mfpdev.sample.MobileFirstAndReactNative*
    - For version - 1.0

  - To learn more about MobileFirst Foundation 8.0 CLI see the following [link](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/using-the-mfpf-sdk/using-mobilefirst-cli-to-manage-mobilefirst-artifacts/)

- Build & Deploy the *MF Blog RSS adapter*
  - Create the adapter
    - From terminal window run the following command:
    ```
    mfpdev adapter create
    ```
    - For name type *MFBlogAdapter*
    - For type choose *HTTP*
    - For group ID choose: com.sample

  - Build the adapter
    - From terminal window go to the adapter root folder and run the following command:
    ```
    mfpdev adapter build
    ```

  - Deploy the adapter
    - From the adapter root folder run the following command:
    ```
    mfpdev adapter deploy
    ```
  - To learn more about MobileFirst Foundation 8.0 Adapters see the following [link](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/adapters/)

- Build & Deploy the *UserLogin Security Check*:
  - Download the UserLogin security check adapter sample from [MobileFirst console samples](http://localhost:9080/mfpconsole/index.html#/downloads#samples) or from the [following link](https://hub.jazz.net/git/imflocalsdk/console-samples/contents/master/UserLogin.zip)

  - For build & deploy the security check repeat the steps from Build & Deploy the *MF Blog RSS adapter*

- Configure the default security scope on MobileFirst Foundation console for each application platform:
  - In your browser go to [MobileFirst Foundation Console](http://localhost:9080/mfpconsole)
  - In each platform of your application set the default scope to be *UserLogin*
  - To learn more about MobileFirst Foundation 8.0 Security follow this [link](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/authentication-and-security/)


  ![dfault-scope](./images/default-scope.png)

- Run the application:
  - You can run each application (Android/iOS) from terminal by run the following commands:
  ```
  react-native run-ios
  ```

  > For Android you need to have connected device or simulator before running the bash command below

  ```
  react-native run-android
  ```
  - Or you can load each native project in the appropriate IDE (XCode/Android Studio) from [android](./android)/[ios](./ios) folders, and run it from there.

### Supported Levels
IBM MobileFirst Foundation 8.0

### License
Copyright 2016 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
