# withTransition

快速创建 cssTransition 动画组件

### 安装

```
npm install react-awesome-snippets-with-transition --save
```

### 使用

withTransition 是个组件工厂函数，传入参数返回生成的支持动画的组件。另外需要额外的 css 支持，以告诉 [react-transition-group](https://reactcommunity.org/react-transition-group/) 该如何处理动画。

#### 参数说明

withTransition 要求必须传入`classNames`属性，该字端用来告诉 [react-transition-group](https://reactcommunity.org/react-transition-group/) 来通过该 className 名字来给节点添加动画。此外，还可以传递`timeout`等参数，设置动画持续时间。更多参数请参考[react-transition-group](https://reactcommunity.org/react-transition-group/)文档。

说明：其实可以理解为参数是用来设置返回组件的默认props。

#### 返回值

withTransition调用后会返回一个React组件，该组件完整支持所有[react-transition-group](https://reactcommunity.org/react-transition-group/)设置项。

```js
import React from 'react';
import { render } from 'react-dom';
import withTransition from 'react-awesome-snippets-with-transition';

const Fade = withTransition({
    classNames: 'fade'
    //timeout: 1000,
    //...more
});

render(
    <Fade in={true}>
        <div className="app">I'm a fade-transition element.</div>
    </Fade>,
    document.getElementById('root')
);
```
css中的代码:
```css
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    opacity: 1;
    transition: opacity 1s ease;
}
.fade-exit {
    opacity: 1;
}
.fade-exit-active {
    opacity: 0;
    transition: opacity 1s ease;
}
```
