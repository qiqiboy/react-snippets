# 带开关的背景音乐播放组件

可以生成带开关的可以自动播放的（支持微信自动播放）的组件 https://0x9.me/4Ke1L

### 使用

```javascript
imporr React from 'react';
import { render } from 'react-dom';
import BGM from 'YOUR_COMPONENTS_DIR/BGM';

import bgmp3 from 'YOUR_MEDIA_DIR/bgm.mp3';

render(<BGM src={bgmp3} />, document.getElementById('root'));
```
