# 背景音乐播放组件

可以生成带开关的可以自动播放的（支持微信和微博自动播放）的组件 http://t.cn/RQxWTFd

### 安装

```
npm install react-awesome-snippets-bgm --save
```

### 属性参数

* **{String} src** 音频文件地址
* **{Boolean} [autoplay]** 是否自动播放
* **{Boolean} [loop]** 是否循环播放
* **{Function} [onplay]** 开始播放时回调（包括从暂停中恢复）
* **{Function} [onpause]** 暂停时回调
* **{Node|Function} [component]** 要渲染的节点，可以传递 react element，也可以传递组件构建函数，该组件将会获得从上级传递下来的播放状态（playing paused）

`component`存在的话会覆盖`children`属性。

### 使用

```javascript
import React from 'react';
import { render } from 'react-dom';
import BGM from 'react-awesome-snippets-bgm';

import bgmp3 from 'YOUR_MEDIA_DIR/bgm.mp3'; //你的音频文件地址

//渲染带状态的节点
render(
    <BGM src={bgmp3}>{({ playing }) => <div className={playing ? 'playing' : 'paused'} />}</BGM>,
    document.getElementById('root')
);

//效果同上
render(
    <BGM src={bgmp3} component={({ playing }) => <div className={playing ? 'playing' : 'paused'} />} />,
    document.getElementById('root')
);
```
