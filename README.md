# react-snippets

工作中总结的一些 react 相关小组件、工具的代码集合

##### 为什么不发布成单独的依赖包（npm package）？

因为这类组件如果要做成可供各种情况下使用的通用库，那么需要大量抽象代码、以及各种自定义接口，需要投入很多精力在这种封装上。一方面，这种大而全的库 github 上基本上各类都有，另一方面，自己的个人精力有限。我自己觉得简单拷贝，然后根据自己的项目需求，可以做一些定制（非必须），更好的与项目结合，也是更灵活的方式。

### 使用

有两种方式可以使用本代码组件：

##### 1. 通过 npm 安装依赖

该方式代码已经经过 babel、sass 转换为普通的 es5 和 css 代码，只需要你的项目支持 webpack，以及具有 css-loader、file-loader 即可。

**注：该方式无法对组件进行定制，所以不推荐使用**

```
npm install react-anwsome-snippets --save
```

项目中调用（以 BGM 组件示例）：

```js
import React from 'react';
import { render } from 'react-dom';
import bgmp3 from 'YOUR_MEDIA_DIR/bgm.mp3';

import { BGM } from 'react-anwsome-snippets';
// or
import BGM_1 from 'react-anwsome-snippets/lib/components/BGM';

render(<BGM src={bgmp3} />, document.getElementById('root'));
```

运行环境要求：

* webpack
* css-loader

##### 2. 直接在项目中使用原始组件代码

你需要将 `src/components` 下你需要使用的组件复制进你的项目中，按照通用方式引用即可。确保该位置的代码会正确经过 webpack-babel-sass 的转换编译。

项目中调用（以 BGM 组件示例）：

```js
import React from 'react';
import { render } from 'react-dom';
import bgmp3 from 'YOUR_MEDIA_DIR/bgm.mp3';
import BGM from 'YOUR_COMPONENTS_DIR/BGM';

render(<BGM src={bgmp3} />, document.getElementById('root'));
```

运行环境要求：

* webpack
* Babel - `babel-preset-react-app@^3.1.0`
* sass-loader

### 目录

更具体的使用说明请参考具体组件页面说明

* [CreatePic](https://github.com/qiqiboy/react-snippets/tree/master/src/components/CreatePic) 合成片段图片或文字到一张图片上
* [BGM](https://github.com/qiqiboy/react-snippets/tree/master/src/components/BGM) h5 背景音乐
* [Preload](https://github.com/qiqiboy/react-snippets/tree/master/src/components/Preload) 图片资源处预加载
