# dabut

=====

よく使う最小限の機能だけのutilityです。

## dabut.initialize(initializer);

- initializer: Function : ページ読み込み時に実行される関数

document.onDOMContentLoadedイベントへハンドラーを登録するラッパーです。
documentおよびwindowのloadイベント専用のため、imageやiframeなどには使えません。


## dabut.el(selector [, context]);

- selector: String : CSSセレクタ
- context: Element : 基準となるElement

- returns: Element

querySelector()のラッパーです。
contextを省略すると、documentが使われます。

## dabut.els(selector [, context])

- selector: String : CSSセレクタ
- context: Element : 基準となるElement

- returns: NodeList

querySelectorAll()のラッパーです。
contextを省略すると、documentが使われます。

## dabut.each(items, callback [, args ...]);

配列またはプレーンオブジェクトのそれぞれの要素に対して、callback関数を実行します。

### callback(item, index, array [, args ...]);

- item: Any : 配列、プレーンオブジェクトの要素
- index: Number : 配列の添字
- array: Any : debut.eachへの第一引数
- args: Any : dabut.each()の第３引数以降

callbackへの第1から第3引数はArray.prototype.forEachのコールバック関数への引数と同じです。

## exporter

エクスポーターを使う事で、dabutネームスペースからグローバル化する事が出来ます。
エクスポートされる機能は`initialize()`、`el()`、`els()`、`each()`です。
メソッドのみエクスポートする事も出来ます。

```
dab.export('dabut');
dab.export('dabut.each');
```



## Supported Browsers

- IE 8+
- Firefox 3.5+
- Chrome 4+
- Safari 3.1+
- Opera 10+
- Android 2.3+
- Chrome for Android 

