# NJU-LUG Blogroll

南京大学 [Linux User Group](https://git.nju.edu.cn/nju-lug/lug-introduction) 收集的同学们的 Blog。


## 聚合页面

[聚合页面](https://blogroll.njulug.org/) 自动聚合这个 `README.md` 文件的表格中的所有 RSS 源，并以用户友好的方式显示出来。

欢迎在线浏览：https://blogroll.njulug.org/

聚合页面使用 Vue 框架编写，在每次 Push 之后，与每天定时 0 点和 12 点的时候，均会通过 GitHub Action 自动集成和部署到 Cloudflare 上。

聚合页面由 [@OrangeX4](https://github.com/OrangeX4) 维护，如发现页面上有任何 Bug，欢迎在本 Repo 中提出 Issues。


## 聚合 RSS 订阅

我们也制作了一个聚合 RSS，欢迎来订阅：

https://blogroll.njulug.org/rss.xml


## FAQ

> 萌新也可以加 Blog 列表么？

能。只要是南京大学的同学和校友都欢迎。

> 有些 Blog 太久没更新或失效了，怎么办？

提 Pull Request 将其删除，同时我们也会通过 Github Action 的自动更新中的 Log 来判断是否失效。


## 添加方式

先 Fork 这个项目，编辑这个 `README.md` 文件的内容，在 **表格最下面一行** 添加（也即按时间顺序），最后提交 Pull Request 进行更改。

如果无 RSS 源，可以使用 `---` 代替，聚合页面将不会抓取。

Pull Request 规范：标题为自己的名字，内容可以是对自己和博客的介绍。

> 南大协同表格支持建设中...


## Lists

| Name | RSS | HTML |
| --   | --  | --   |
| OrangeX4's Blog | https://orangex4.cool/atom.xml | https://orangex4.cool/ |
| Idealclover's Blog | https://idealclover.top/feed | https://idealclover.top/ |
| Typoverflow's Blog | https://blog.typoverflow.me/index.php/feed/ | https://blog.typoverflow.me/ |
| Cmj's Blog | https://blog.caomingjun.com/atom.xml | https://blog.caomingjun.com/ |
| Mexii's Blog | https://blog.mexii.dev/atom.xml | https://blog.mexii.dev/ |
| LadderOperator's Blog | https://ladderoperator.top/index.xml | https://ladderoperator.top |
| Antares's Blog | https://chr.fan/feed | https://chr.fan |
| lyc8503's Blog | https://blog.lyc8503.site/atom.xml | https://blog.lyc8503.site/ |
| YeungYeah 的乱写地 | https://scottyeung.top/atom.xml | https://scottyeung.top/ |
| yaoge123's Blog | https://www.yaoge123.com/blog/feed | https://www.yaoge123.com/ |
| 南雍随笔 | https://ydjsir.com.cn/atom.xml | https://ydjsir.com.cn/ |
| Kevinpro's Blog | --- | https://www.yuque.com/kevinpro |
| Domon | https://www.domon.cn/rss/ | https://www.domon.cn |
| 极东魔术昼寝结社 | https://www.jaoushingan.com/atom.xml | https://www.jaoushingan.com |
| Chivalric Gong | --- | https://gmy-acoustics.github.io/ |
| Persvadisto's Blog | https://persvadisto.github.io/atom.xml | https://persvadisto.github.io/ |

## OPML

`opml.xml` 地址：https://blogroll.njulug.org/opml.xml

你可以使用 `opml.xml` 文件在 Inoreader 里持续订阅，或在 Feedly 下载之后导入。

> OPML（英语：Outline Processor Markup Language）意为“大纲处理标记语言”，是一种基于 XML 上的文件保存格式。目前流行的应用方式为收集博客或播客的 RSS 来源，整理成单一可交换的 OPML 格式的订阅列表，让用户便于转移自己的订阅项目。
>
> -- Wikipedia


## See Also

- https://github.com/tuna/blogroll
- https://github.com/NUAA-Open-Source/BlogRoll
- https://github.com/timqian/chinese-independent-blogs
