# upload2stronx

## 功能描述

前端对接 stronx 系统的工具类

## 使用示例

### 在项目中安装依赖

```bash
# 使用 npm 安装依赖
npm i --save upload2stronx

# 或者使用 yarn 安装依赖
yarn add upload2stronx
```

### 在代码中使用

1、导入模块:

```javascript
import Upload2Stronx from "upload2stronx";
```

2、初始化 Upload2Stronx 实例:

```javascript
// 初始化 Upload2Stronx 对象时传入的三个参数分别为：
// 1. stronxUrl：stronx 给出的接口地址
// 2. filePath：业务系统在 stronx 的文件存储目录
// 3. stronxJWT：业务系统向 stronx 获取的 token
const uploadInstance = new Upload2Stronx(stronxUrl, filePath, stronxJWT);
```

3、调用上传文件方法 handleUploadFiles 或者 handleUploadFile

> handleUploadFiles 方法用于上传多个文件，需要传入 File 数组
> handleUploadFile 方法用于上传单个文件，需要传入 File

```javascript
// 上传多个文件
uploadInstance.handleUploadFiles(fileList).then((res) => {
  // 在这里做文件上传成功后的处理
});

// 上传单个文件
uploadInstance.handleUploadFile(file).then((res) => {
  // 在这里做文件上传成功后的处理
});
```
