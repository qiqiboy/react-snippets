# 带开关的背景音乐播放组件

可以生成带开关的可以自动播放的（支持微信自动播放）的组件 http://t.cn/RQxWTFd

### 安装
该方式不推荐使用，建议直接复制本代码进项目中，根据需求定制。
```
npm install react-awesome-snippets-bgm --save
```

### 使用

```javascript
import React from 'react';
import { render } from 'react-dom';
//源码调用
import BGM from 'YOUR_COMPONENTS_DIR/BGM';
//or 安装npm包调用
import BGM from 'react-awesome-snippets-bgm';

import bgmp3 from 'YOUR_MEDIA_DIR/bgm.mp3';

render(<BGM src={bgmp3} />, document.getElementById('root'));
```
