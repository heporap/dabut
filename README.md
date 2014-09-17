dabut

=====

最小utilityです。

## dabut.initialize(initializer);

- returns: none

- initializer: Function : ページ読み込み時に実行される関数

document.onDOMContentLoaded, window.onload イベントへハンドラーを登録するラッパーです。
documentおよびwindowのloadイベント専用のため、imageやiframeなどには使えません。


## dabut.el(selector [, context]);

- returns: Element

- selector: String : CSSセレクタ
- context: Element : 基準となるElement

querySelector()のラッパーです。
contextを省略すると、documentが使われます。

## dabut.els(selector [, context])

- returns: NodeList

- selector: String : CSSセレクタ
- context: Element : 基準となるElement

querySelectorAll()のラッパーです。
contextを省略すると、documentが使われます。

## dabut.each(context, callback [, args ...]);

contextのそれぞれの要素に対して、callback関数を実行します。

### callback(item, index, array [, args ...]);
- item: Any : 配列の要素
- index: Number : 配列の添字
- array: Any : debut.forEachへの第一引数
- args: Any : dabut.each()の第３引数以降

## exporter

エクスポーターを使う事で、dabutネームスペースからグローバル化する事が出来ます。
エクスポートされる機能は`initialize()`、`el()`、`els()`、`forEach()`です。
メソッドのみエクスポートする事も出来ます。

```
dab.export('dabut');
dab.export('dabut.forEach');
```



## Supported Browsers

- IE 8+
- Firefox 3.5+
- Chrome 4+
- Safari 3.1+
- Opera 10+
- Android 2.3+
- Chrome for Android 

