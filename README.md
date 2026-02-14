# 主页编辑说明
  
## 一、运行项目
### 一键运行（推荐）
```bash
./run-site.sh
```
默认会自动安装依赖（若缺失）、启动本地服务并自动打开浏览器。  
可选模式：
```bash
./run-site.sh build
./run-site.sh preview
./run-site.sh public
./run-site.sh public-tunnel
```

### 对外访问 + 收集反馈
```bash
HOST=0.0.0.0 PORT=4180 ./run-site.sh public
```
说明：
1. `public` 模式会先构建，再启动同机服务 `server/feedback-server.js`。  
2. 其他人访问 `http://你的局域网IP:4180` 可浏览全部页面。  
3. 在 `Feedback` 页面提交的意见会保存到本机 `feedback-data/feedback-YYYY-MM.jsonl`。  
4. 若需公网访问，请在路由器做端口映射，或使用 frp / cloudflared / ngrok 等隧道工具。

### 一键公网临时访问（无需路由器配置）
```bash
PORT=4173 ./run-site.sh public-tunnel
```
启动后会输出一个 `https://*.loca.lt` 的公网地址，外网用户访问该链接即可浏览网站并提交反馈。  
可选固定子域名（若可用）：
```bash
LT_SUBDOMAIN=lumia-beta PORT=4173 ./run-site.sh public-tunnel
```

### 手动运行
1. 安装依赖
  
```
npm install
```
2. 启动项目
```
npm run serve
```

## 二、添加和修改页面内容

除网页 Header 和 People 页面外，其他页面无需在html代码中做修改。

在项目中的src/data文件夹中，找到相应的js文件，按照注释指引，修改和添加内容即可。

### Header修改和添加
1. 在项目中的src/data文件夹中，找到相应的header.js文件，按照注释指引，修改和添加内容。
2. 若新增header，则需同样在src/router/index.js文件中，添加一个相应的路由（因为新增一个header代表新增一个页面），router/index.js文件中格式如下：
```
{
path:  "/news",
name:  "news",
component:  News,
},
```
### People修改和添加
#### 修改或添加老师或学生
在项目中的src/data文件夹中，people.js文件，按照注释指引，修改和添加内容即可。
#### 增加类目或者修改折叠面板标题名称
需要在相应html代码中做相应的修改，具体位置在src/views/People.vue，代码中有相应的注释指引。

## 三、部署项目

修改完成后，首先在本地进行编译：
```
npm run build
```

编译完成后正常提交代码即可。
