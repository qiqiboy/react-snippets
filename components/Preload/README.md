# 图片资源预加载

可以提前缓存项目里的图片资源，预加载完毕再进入应用 https://0x9.me/4Ke1L

### 使用

```javascript
imporr React from 'react';
import { render } from 'react-dom';
import Preload from 'YOUR_COMPONENTS_DIR/Preload';
import App from 'YOUR_COMPONENTS_DIR/App'; //项目入口组件

render(<Preload>
        <App />
    </Preload>, document.getElementById('root'));
```
