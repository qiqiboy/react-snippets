# classnames

从对象、数组快速生成 className

### 安装

```
npm install react-awesome-snippets-classnames --save
```

### 使用

classnames 是个函数，类似angularjs中的 ng-class，可以根据传入的对象属性的bool值，动态渲染需要的className。

```js
import React from 'react';
import { render } from 'react-dom';
import classnames from 'react-awesome-snippets-classnames';

let someclass = true;

render(
    <div
        classNames={classnames({
            someclass,
            anotherClass: false
        })}
    />,
    document.getElementById('root')
);
```
