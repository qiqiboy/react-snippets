# react-snippets
工作中总结的一些react相关小组件、工具的代码集合

#####为什么不发布成单独的依赖包（npm package）？

因为这类组件如果要做成可供各种情况下使用的通用库，那么需要大量抽象代码、以及各种自定义接口，需要投入很多精力在这种封装上。
一方面，这种大而全的库github上基本上各类都有，另一方面，自己的个人精力有限。我自己觉得简单拷贝，然后根据自己的项目需求，可以做一些定制（非必须），更好的与项目结合，也是更灵活的方式。

### 说明
所有代码均在 [tiger-new](https://github.com/qiqiboy/tiger-new) 生成的标准项目下开发测试，不保证在其它构建工具、工程项目下可以稳定运行。  

基本的运行环境为：
* webpack
* Babel - `babel-preset-react-app@^3.1.0`
* sass-loader

### 目录
* [CreatePic](https://github.com/qiqiboy/react-snippets/tree/master/components/CreatePic) 合成片段图片或文字到一张图片上
