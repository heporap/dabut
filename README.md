# dabut

よく使う最小限の機能だけのutilityです。

## dabut.initialize(initializer);

1. initializer: Function : ページ読み込み時に実行される関数

document.onDOMContentLoadedイベントへハンドラーを登録するラッパーです。
documentおよびwindowのloadイベント専用のため、imageやiframeなどには使えません。


## dabut.el(selector [, context]);

1. selector: String : CSSセレクタ
2. context: Element : 基準となるElement

- returns: Element

querySelector()のラッパーです。
contextを省略すると、documentが使われます。

## dabut.els(selector [, context])

1. selector: String : CSSセレクタ
2. context: Element : 基準となるElement

- returns: NodeList

querySelectorAll()のラッパーです。
contextを省略すると、documentが使われます。

## dabut.each(items, callback [, args ...]);

1. items: Any : 配列、プレーンオブジェクト
2. callback: Function : 要素に対して呼び出されるコールバック関数
3. args: Any : コールバック関数の第4引数以降で渡される値

- returns: Array

配列またはプレーンオブジェクトのそれぞれの要素に対して、callback関数を実行します。

each()はfilter()やgrep()などと同じような機能を提供します。
callback関数からの戻り値がtrueの場合は第一引数を、それ以外は戻り値を配列にした物が、each()の戻り値となります。
callback関数の戻り値がfalse、undefinedのいずれかの場合には、each()の戻り値には含まれません。


### callback(item, index, array [, args ...]);

1. item: Any : 配列、プレーンオブジェクトの要素
2. index: Number : 配列の添字
3. array: Any : debut.eachへの第一引数
4. args: Any : dabut.each()の第３引数以降

callbackへの第1から第3引数はArray.prototype.forEachのコールバック関数への引数と同じです。

## dabut.position(element)

1. element: String or Element : メトリックスを取得するElement

- returns: { top: Number, left: Number, width: Number, height: Number }

element.getBoundingClientRect()のラッパーです。

## dabut.style(element, prop [, value])

1. element: Element : スタイルを取得または設定したいElement
2. prop: String : 
3. value: String : 

- returns: String :



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

