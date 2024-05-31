
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @notifee/react-native
import io.invertase.notifee.NotifeePackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-clipboard/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/checkbox
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @zegocloud/react-native-callkeep
import io.wazo.callkeep.RNCallKeepPackage;
// @zegocloud/zego-uikit-prebuilt-call-rn
import com.zegouikitprebuiltcallrn.ZegoUIKitPrebuiltCallRNPackage;
// @zegocloud/zego-uikit-rn
import com.zegouikitrn.ZegoUIKitRNPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-compressor
import com.reactnativecompressor.CompressorPackage;
// react-native-contacts
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
// react-native-document-picker
import com.reactnativedocumentpicker.RNDocumentPickerPackage;
// react-native-encrypted-storage
import com.emeraldsanto.encryptedstorage.RNEncryptedStoragePackage;
// react-native-file-viewer
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
// react-native-html-to-pdf
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-keep-awake
import com.corbt.keepawake.KCKeepAwakePackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-sound-recorder
import com.kevinresol.react_native_sound_recorder.RNSoundRecorderPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;
// zego-express-engine-reactnative
import im.zego.reactnative.RCTZegoExpressEnginePackage;
// zego-zim-react-native
import im.zego.RNZimReactnativeSdkPackage;
// zego-zpns-react-native
import im.zego.zpns_reactnative_sdk.RCTZegoZPNsPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new NotifeePackage(),
      new AsyncStoragePackage(),
      new ClipboardPackage(),
      new ReactCheckBoxPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new RNCallKeepPackage(),
      new ZegoUIKitPrebuiltCallRNPackage(),
      new ZegoUIKitRNPackage(),
      new RNCameraPackage(),
      new CompressorPackage(),
      new ReactNativeContacts(),
      new RNDocumentPickerPackage(),
      new RNEncryptedStoragePackage(),
      new RNFileViewerPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new RNHTMLtoPDFPackage(),
      new PickerPackage(),
      new KCKeepAwakePackage(),
      new LinearGradientPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSoundPackage(),
      new RNSoundRecorderPackage(),
      new SvgPackage(),
      new ReactVideoPackage(),
      new RNFetchBlobPackage(),
      new RCTZegoExpressEnginePackage(),
      new RNZimReactnativeSdkPackage(),
      new RCTZegoZPNsPackage()
    ));
  }
}
