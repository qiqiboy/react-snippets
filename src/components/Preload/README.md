# 图片资源预加载

可以提前缓存项目里的图片资源，预加载完毕再进入应用 http://t.cn/RQxWTFd

### 安装

```
npm install react-awesome-snippets-preload --save
```

### 属性参数

* **{Array} images** 要缓存的图片地址数组
* **{Number} parallel** 一次加载的图片数量，默认为 5。为了避免过多占用 http 连接数，缓存采用队列形式加载，这里定义队列中每次同时加载的图片数量
* **{Node|Function} component** 缓存中时要渲染的节点

除以上参数，还可以传递`react-transition-group`中的`cssTransition`组件的可用参数，将会直接传递给所使用的`cssTransition`组件。例如：

* **timeout** 默认为 `1000`
* **classNames** 默认为 `preload`
* **unmountOnExit** 默认为 `true`
* ...

`classNames`不是定义节点class-name的`className`，这里要注意，这个是定义`cssTransition`用来使用的css类名前缀。默认为preload，即如果要使用动画，则需要在css中添加一些动画周期的样式定义：

```scss
.preload-exit {
    opacity: 1;
}
.preload-exit-active {
    opacity: 0;
    transition: opacity 1s ease-in;
}
```
具体请参考 [react-tansition-group](https://reactcommunity.org/react-transition-group/)

### 使用

```javascript
import React from 'react';
import { render } from 'react-dom';
import App from 'YOUR_COMPONENTS_DIR/App'; //项目入口组件
import Preload from 'react-awesome-snippets-preload';

//该例子中，缓存项目 static/images 目录下的图片资源
const imgContext = require.context('static/images', true, /\.(jpg|png|gif)$/);
const images = imgContext.keys().map(path => imgContext(path));

render(
    <Preload
        images={images}
        component={({ percent }) => (
            <div className="preload">
                <div className="progress">
                    <div className="bar-outer">
                        <div className="bar-inner" style={{ width: percent * 100 + '%' }} />
                    </div>
                    <div className="text">当前加载进度：{ percent * 100 }%</div>
                </div>
            </div>
        )}>
        <App />
    </Preload>,
    document.getElementById('root')
);
```
