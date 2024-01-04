import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
// #docregion platform_imports
// Import for Android features.
import 'package:webview_flutter_android/webview_flutter_android.dart';
// Import for iOS features.
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late final WebViewController _controller;
  bool pageLoadError = false;
  bool hasError = false;

  @override
  Widget build(BuildContext context) {
    if (hasError == true) {
      return Scaffold(
        appBar: AppBar(title: const Text('Cks Automobile')),
        backgroundColor: Colors.blue,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("No Connection",
                  style: TextStyle(color: Colors.white, fontSize: 20)),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  /*setState(() {
                    hasError = false;
                  });*/
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => MyHomePage()),
                  );
                },
                child: const Text(
                  'Try Again!',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    } else {
      return Scaffold(
          backgroundColor: Colors.blue,
          appBar: AppBar(title: const Text('Cks Automobile')),
          // body: WebViewWidget(controller: _controller),
          body: WebViewWidget(controller: _controller));
    }
    /*
    return Scaffold(
        backgroundColor: Colors.blue,
        appBar: AppBar(title: const Text('Cks Automobile')),
        // body: WebViewWidget(controller: _controller),
        body: hasError
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("No Connection",
                        style: TextStyle(color: Colors.white, fontSize: 20)),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        /*setState(() {
                          hasError = false;
                          _controller.reload();
                        });*/
                        setState(() {});
                      },
                      child: const Text(
                        'Try Again!',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              )
            : WebViewWidget(controller: _controller));

     */
  }

  @override
  void initState() {
    // #docregion platform_features
    late final PlatformWebViewControllerCreationParams params;
    if (WebViewPlatform.instance is WebKitWebViewPlatform) {
      params = WebKitWebViewControllerCreationParams(
        allowsInlineMediaPlayback: true,
        mediaTypesRequiringUserAction: const <PlaybackMediaTypes>{},
      );
    } else {
      params = const PlatformWebViewControllerCreationParams();
    }

    WebViewController controller =
        WebViewController.fromPlatformCreationParams(params);
    // #enddocregion platform_features

    controller
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            //debugPrint('loading (progress : $progress%)');
          },
          onPageStarted: (String url) {
            //debugPrint('Page started loading: $url');
          },
          onPageFinished: (String url) {
            //debugPrint('Page finished loading: $url');
          },
          onWebResourceError: (WebResourceError error) {
            print('there is an error');
            setState(() {
              hasError = true;
            });
          },
          onNavigationRequest: (NavigationRequest request) {
            return NavigationDecision.navigate;
          },
          onUrlChange: (UrlChange change) {
            /*debugPrint('url change to ${change.url}');*/
          },
        ),
      )
      ..loadRequest(Uri.parse('http://45.56.112.162:8081/'));

    // #docregion platform_features
    if (controller.platform is AndroidWebViewController) {
      AndroidWebViewController.enableDebugging(true);
      (controller.platform as AndroidWebViewController)
          .setMediaPlaybackRequiresUserGesture(false);
    }

    _controller = controller;
  }
}
