# CreatePic 将图片、文字等合成图片输出

给定一组图片和文字，按照指定的位置、大小合成输出一张图片

### 使用

```javascript
imporr React from 'react';
import { render } from 'react-dom';
import CreatePic from 'YOUR_COMPONENTS_DIR/CreatePic';

render(<CreatePic
        width={750}
        height={1000}
        background="#ffffff"
        config={[
        {
            image: require('some-pic-1.png'),
            x: 10,
            y: 10
        },
        {
            image: require('some-pic-12.png'),
            x: 100,
            y: 200,
            width: 100,
            height: 100
        },
        {
            text: `文本渲染，支持段落、换行、文字对齐、英文单词边缘主动换行等特性。
抛出异常：IndexOutOfBoundsException: 当参数为负数或者参数不小于字符串的长度时抛出。`,
            x: 5000,
            y: 600,
            font: '30px Arial', //字体尺寸及类型，同css中font
            width: 500, //渲染宽度
            lineHeight: 50, //行高，默认为字体大小的1.4倍
            align: 'left' //文字对齐方向，枚举值：left | center | right
        }
]} />, document.getElementById('root'));
```
