# 图片资源预加载

可以提前缓存项目里的图片资源，预加载完毕再进入应用 http://t.cn/RQxWTFd

### 安装
该方式不推荐使用，建议直接复制本代码进项目中，根据需求定制。
```
npm install react-awesome-snippets-preload --save
```

### 使用

```javascript
import React from 'react';
import { render } from 'react-dom';
import App from 'YOUR_COMPONENTS_DIR/App'; //项目入口组件
//源码调用
import Preload from 'YOUR_COMPONENTS_DIR/Preload';
//or 安装npm包调用
import Preload from 'react-awesome-snippets-preload';

render(<Preload>
        <App />
    </Preload>, document.getElementById('root'));
```
