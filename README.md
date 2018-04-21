# react-snippets

> 工作中总结的一些 react 相关小组件、工具的代码集合

### 使用

有两种方式可以使用本代码组件：

##### 1. 通过 npm 安装依赖

该方式代码已经经过 babel、sass 转换为普通的 es5 和 css 代码，只需要你的项目支持 webpack，以及具有 css-loader、file-loader 即可。

```bash
# 安装全部
npm install react-awesome-snippets --save

# 安装子模块
npm install react-awesome-snippets-bgm --save
npm install react-awesome-snippets-preload --save
npm install react-awesome-snippets-create-pic --save
npm install react-awesome-snippets-blink --save
npm install react-awesome-snippets-classnames --save
npm install react-awesome-snippets-with-transition --save
```

项目中调用（以 BGM 组件示例）：

```js
import React from 'react';
import { render } from 'react-dom';
import bgmp3 from 'YOUR_MEDIA_DIR/bgm.mp3';
import { BGM, CreatePic, Preload } from 'react-awesome-snippets';
// or
import BGM from 'react-awesome-snippets-bgm';

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

#### 组件
* [CreatePic](https://github.com/qiqiboy/react-snippets/tree/master/src/components/CreatePic) 合成片段图片或文字到一张图片上
* [BGM](https://github.com/qiqiboy/react-snippets/tree/master/src/components/BGM) h5 背景音乐
* [Preload](https://github.com/qiqiboy/react-snippets/tree/master/src/components/Preload) 图片资源处预加载
* [BlinkAnimation](https://github.com/qiqiboy/react-snippets/tree/master/src/components/BlinkAnimation) 生成图片帧动画
* [AnimatedRouter](https://github.com/qiqiboy/react-animated-router) 便捷的路由动画切换组件

#### 工具

* [classnames](https://github.com/qiqiboy/react-snippets/tree/master/src/utils/classnames) 快速生成className
* [withTransition](https://github.com/qiqiboy/react-snippets/tree/master/src/utils/withTransition) 快速生成cssTransition组件
