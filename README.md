# dabut

よく使う最小限の機能だけのutilityです。

## dabut.initialize(initializer);

1. initializer: Function : ページ読み込み時に実行される関数

document.onDOMContentLoadedイベントへハンドラーを登録するラッパーです。
documentおよびwindowのloadイベント専用のため、imageやiframeなどには使えません。

## dabut.el(selector [, context]);

1. selector: String : CSSセレクタ
2. context: Element : 基準となるElement

returns: Element

querySelector()に似ていますが、複数のセレクタが指定された場合、最初に見つかった要素を返します。
contextを省略すると、documentが使われます。

## dabut.els(selector [, context])

1. selector: String : CSSセレクタ
2. context: Element : 基準となるElement

returns: NodeList

querySelectorAll()に似ていますが、複数のセレクタが指定された場合、見つかった要素のみを返します。
contextを省略すると、documentが使われます。

## dabut.each(items, callback [, args ...]);

1. items: Any : 配列、プレーンオブジェクト
2. callback: Function : 要素に対して呼び出されるコールバック関数
3. args: Any : コールバック関数の第4引数以降で渡される値

returns: Array

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

callback関数から返されたオブジェクトがeach関数の返り値となります。
これにより、eachを擬似的なgrep、filterとして扱えます。

## dabut.position(element, abs)

1. element: String or Element : メトリックスを取得するElement
2. abs: Boolean or String : trueまたは'abs'を指定すると、ドキュメントの左上を基準にした位置を取得します。

returns: { top: Number, left: Number, width: Number, height: Number }

ウインドウの左上を基準にした位置を取得します。（スクロール量に関係なく一定です。）
absに'abs'を指定すると、ドキュメントの左上を基準にした位置を取得します。
element.getBoundingClientRect()のラッパーです。

## dabut.style(element, prop [, value])

DOM要素のスタイルを取得、またはスタイルを設定します。

### dabut.style(element, prop, value)

1. element: Element : スタイルを取得または設定したいElement
2. prop: String
3. value: String

returns: String

第二引数が String の場合は第三引数は無指定、またはStringでなければなりません。
第三引数が指定してあれば、第二引数をプロパティ、第三引数を値としてDOM要素のスタイルを指定します。

第三引数が指定してなければ、第二引数で指定したスタイルを返します。

### dabut.style(element, prop:Object)

1. element: Element : スタイルを設定したいElement
2. prop: Object

第二引数を{スタイル名：値} の組で指定することで、複数のスタイルを指定できます。

### dabut.style(element, prop)

1. element: Element
2. prop: Array

returns: Object

第二引数をスタイル名の配列にすることで、そのすべてのスタイル値を``{スタイル名:スタイル値}``で返します。

## dabut.ticker.append(fn, context)

1. fn: Function
2. context: Any

returns: Number

requestAnimationFrame()を使用した定期的な関数呼び出しを行います。

## dabut.ticker.remove(id)

1. id: Number : dabut.ticker.append()の戻り値

dabut.ticker.append()の登録を解除します。

idにはdabut.ticker.appendの戻り値のほかに、Functionオブジェクトが指定できます。

## dabut.on(element, type, fn)

1. element: Element :
2. type: String :
3: fn : Function

## dabut.isString(o)

1. o: Any

returns: Boolean

oが文字列ならtrueを返します。

## dabut.isNumber(o)

1. o: Any

returns: Boolean

oが数値ならtrueを返します。
数字はfalseとなります。

## dabut.isFunction(o)

1. o: Any

returns: Boolean

oがFunctionオブジェクトならtrueを返します。

## dabut.isArray(o)

1. o: Any

returns: Boolean

oが配列ならtrueを返します。
arguments、nodeList、lengthプロパティを持つオブジェクトはfalseとなります。

## dabut.isObject(o)

1. o: Any

returns: Boolean

oがプレーンオブジェクトならtrueを返します。

## exporter

エクスポーターを使う事で、dabutネームスペースからグローバル化する事が出来ます。
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
