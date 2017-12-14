# フロント開発環境

##導入

```
$ sudo npm install

```

##サーバー立ち上げと監視

```
$ npm run watch
```

##ビルド
```
$ npm run prod
```

## ディレクトリ構成

### 開発用ディレクトリ
開発時にさわるディレクトリーはresources以下のものになります。
resources/assets  -  scss,js,images,icons
resources/view - pug

```
resources
├── assets
     ├── icons  # アイコンフォント用 svg 画像フォルダ
     ├── images # 画像フォルダ
     ├── pug  # pug フォルダ
     │   ├── _include  # include, extends 用ファイル
     │   │   ├── _footer.pug
     │   │   ├── _header.pug
     │   │   └── _layout.pug
     │   ├── parking(他)  # サイトのディレクトリ構造と同じ構造でpugを量産
     │   └── index.pug
     ├── js  # JavaScript用
     └── scss  # sass ファイル用
         ├── style.scss
         ├── foundation  # 初期設定系 bootstrapやリセットcssなど
         │      ├── _bootstrap.scss
         ├── layout
         │      ├── _footer.scss
         │      ├── _header.scss
         │      ├── _main.scss
         │      └── _sidebar.scss
         │
         ├── object
                ├── component # 再利用可能 パーツを組み合わせたコンポーネント
                ├── pages  # 再利用不可能 そのページ特有のスタイル
                ├── utility  # mb20など、便利クラス
```

resources以下のものはコンパイルおよびbuildしたのち、publicフォルダ以下に生成されていきます。

### ブラウザ確認及び本番

public以下にresourcesでコンパイルしたものが生成されます。


```
public
├── fonts  # アイコンフォント用フォントファイル（gulp が自動生成）
├── css
│   └── style.css
├── images
│   ├── common
│   ├── top
│   └── page
├── js
│   └── bundle.js
└── index.html

```

### webpackについて
jsのプラグインなどの結合はwebpack.config.js内で行います。  
entry: {} の中でオブジェクト、もしくは配列で指定してください。


参考サイト
http://qiita.com/chuck0523/items/caacbf4137642cb175ec%20#3-entry--文字列-vs-配列-vs-オブジェクト


jqueryはnpmで落としてきたものをwebpack.config.js内で使用できるように記述されています。

```
 plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]

```

###CSSの設計思想
ベースの設計はflocssを採用している。 
https://github.com/hiloki/flocss     
http://www.tam-tam.co.jp/tipsnote/html_css/post10205.html    

     └── scss  # sass ファイル用
         ├── style.scss
         ├── foundation  # 初期設定系 bootstrapやリセットcssなど
         │      ├── _bootstrap.scss
         ├── layout
         │      ├── _footer.scss
         │      ├── _header.scss
         │      ├── _main.scss
         │      └── _sidebar.scss
         │
         ├── object
                ├── parts  # パーツ 部品の最小単位
                ├── component # 再利用可能 パーツを組み合わせたコンポーネント
                ├── pages  # 再利用不可能 そのページ特有のスタイル
                ├── utility  # mb20など、便利クラス

object/component は再利用可能
object/pages は再利用不可能

### スタイルガイドについて
sc5-styleguideを使用
https://github.com/SC5/sc5-styleguide

スタイルガイド生成

npm run watchから外しているため、手動で生成

```
$gulp styleguide

```
確認URL
/styleguide/#/section/1.1.1
