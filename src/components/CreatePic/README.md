# CreatePic 将图片、文字等合成图片输出

给定一组图片和文字，按照指定的位置、大小合成输出一张图片 http://github.boy.im/react-snippets/create-pic

### 安装

该方式不推荐使用，建议直接复制本代码进项目中，根据需求定制。

```
npm install react-awesome-snippets-create-pic --save
```

### 使用

```typescript
import React from 'react';
import { render } from 'react-dom';
//源码调用
import CreatePic from 'YOUR_COMPONENTS_DIR/CreatePic';
//or 安装npm包调用
import CreatePic from 'react-awesome-snippets-create-pic';

render(
    <CreatePic
        width={750}
        height={1000}
        background="#ffffff"
        config={[
            {
                image: require('some-pic-1.png'),
                x: 10, //绘制的起始点横坐标
                y: 10 //绘制的起始点纵坐标
            },
            {
                image: require('some-pic-12.png'),
                x: 100,
                y: 200,
                width: 100,
                height: 100,
                round: true,
                composite: 'source-over' //图片复合蒙层类型，取值同 canvas 的 globalCompositeOperation
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
        ]}>
        图片生成中...
    </CreatePic>,
    document.getElementById('root')
);
```

#### 特别说明

* 如果是`text`，那么如果设置了高度，并且文本超出，会自动在截断位置显示`...`
* 如果是`image`，那么可以设置`round: true`，那么将会在图片中心位置裁切一个最大的圆形图片显示（圆角效果）

如果图片较多，加载需要时间，所以可能生成速度会有影响，如果图片还没生成，会默认显示 `<CreatePic></CreatePic>` 的子节点。
