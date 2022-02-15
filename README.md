# NJU-LUG Blogroll

南京大学 [Linux User Group](https://git.nju.edu.cn/nju-lug/lug-introduction) 收集的同学们的 Blog。


## 聚合页面

> 聚合页面建设中。

**基本想法：**

通过 GitHub Action 执行 `index.js` 脚本，生成 `opml.xml`，`opml.json` 和 `data.json` 三个文件。

其中 `opml.xml`（位于 `web/public`）和 `opml.json`（位于 `web/src/assets`）就是将 `README.md` 表格中的内容简单翻译为 XML 和 JSON 格式。而 `data.json` （位于 `web/src/assets`）文件，是读取所有 Blog 的 RSS 信息，将获取到的博文 RSS Items 按照时间顺序排列后，取出最新的 30 个生成的一个 JSON 文件，其用于在聚合页面中展示。

使用 Vue 框架搭建一个渲染聚合页面的前端项目，读取生成的 `opml.json` 和 `data.json` 并渲染。这个项目位于 `web` 目录下。

最后使用 GitHub Action，在每次 Push 和每天定时（例如晚上 12 点）的时候，执行 `npm run build` 生成静态文件，并部署到 Cloudflare 上（待定）。

除此之外，还打算加入南大协同表格支持，只需要填写表格就能自动同步到这个 Repo 里。

**建设进度：**

1. 通过 `README.md` 生成相应文件的 `index.js` 脚本 ☑
2. Vue 项目的基础框架 ☑
3. Vue 项目的美化（[文档](https://staging-cn.vuejs.org/guide/introduction.html)） ✘
4. GitHub Action 的部署功能 ✘
5. 南大协同表格支持（[文档](https://seatable.github.io/seatable-scripts-cn/)） ✘

**欢迎贡献：**

Vue 项目开发方式（需要先安装 NodeJS）：

```sh
# 克隆并安装依赖
git clone https://github.com/nju-lug/blogroll.git
cd blogroll
npm install

# 开始开发
npm run dev
```


## FAQ

> 萌新也可以加 Blog 列表么？

能。只要是南京大学的同学和校友都欢迎。

> 有些 Blog 太久没更新或失效了，怎么办？

提 Pull Request 将其删除，同时我们也会通过 Github Action 的自动更新中的 Log 来判断是否失效。


## 添加方式

先 Fork 这个项目，编辑这个 `README.md` 文件的内容，在 **表格最下面一行** 添加（也即按时间顺序），最后提交 Pull Request 进行更改。

Pull Request 规范：标题为自己的名字，内容可以是对自己和博客的介绍。

> 南大协同表格支持建设中...


## Lists

| Name | RSS | HTML |
| --   | --  | --   |
| OrangeX4's Blog | https://orangex4.cool/atom.xml | https://orangex4.cool/ |
| Idealclover's Blog | https://idealclover.top/feed | https://idealclover.top/ |
| Typoverflow's Blog | https://blog.typoverflow.me/index.php/feed/ | https://blog.typoverflow.me/ |
| Cmj's Blog | https://blog.caomingjun.com/atom.xml | https://blog.caomingjun.com/ |
| Mexii's Blog | https://blog.mexii.one/atom.xml | https://blog.mexii.one/ |
| LadderOperator's Blog | https://ladderoperator.top/index.xml | https://ladderoperator.top |


## OPML

`opml.xml` 与聚合页面正在同时建设中，目前可以在 `web/public` 目录下找到。

你可以使用 `opml.xml` 文件在 Inoreader 里可以持续订阅，在 Feedly 里可以下载之后导入。

> OPML（英语：Outline Processor Markup Language）意为“大纲处理标记语言”，是一种基于 XML 上的文件保存格式。目前流行的应用方式为收集博客或播客的 RSS 来源，整理成单一可交换的 OPML 格式的订阅列表，让用户便于转移自己的订阅项目。
>
> -- Wikipedia

## See Also

- https://github.com/tuna/blogroll
- https://github.com/NUAA-Open-Source/BlogRoll
- https://github.com/timqian/chinese-independent-blogs
