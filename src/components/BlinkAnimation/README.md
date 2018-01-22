# 闪动动画组件
传入一组图片，自动按帧播放

### 安装

```
npm install react-awesome-snippets-blink --save
```

### 属性参数

* **{Boolean} playing** 是否播放
* **{Number} duration** 播放一组动画所需时间
* **{Array} frames** 每一帧图片地址

### 使用

```javascript
import React from 'react';
import { render } from 'react-dom';
import Blink from 'react-awesome-snippets-blink';

import pic0 from 'images/pic0.png';
import pic1 from 'images/pic1.png';

render(
    <Blink frames={[pic0, pic1]} duration={800} playing={true} />,
    document.getElementById('root')
);
```
