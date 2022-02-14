// 文件读取包
const fs = require('fs');
const { exit } = require('process');
// 引入 RSS 解析第三方包
const Parser = require('rss-parser');
const parser = new Parser();

// 相关配置
const opmlXmlContentTitle = 'NJU-LUG Blogroll';
const readmeMdPath = './README.md';
const opmlJsonPath = './web/src/assets/opml.json';
const dataJsonPath = './web/src/assets/data.json';
const maxDataJsonItemsNumber = 30;
const opmlXmlPath = './web/public/opml.xml';
const opmlXmlContentOp = '<opml version="2.0">\n  <head>\n    <title>' + opmlXmlContentTitle + '</title>\n  </head>\n  <body>\n\n';
const opmlXmlContentEd = '\n  </body>\n</opml>';

// 解析 README 中的表格，转为 JSON
const pattern = /\| *([^\|]*) *\| *(http[^\|]*) *\| *(http[^\|]*) *\|/g;
const readmeMdContent = fs.readFileSync(readmeMdPath, { encoding: 'utf-8' });
// 生成 opml.json
const opmlJson = [];
let resultArray;
while ((resultArray = pattern.exec(readmeMdContent)) !== null) {
  opmlJson.push({
    title: resultArray[1].trim(),
    xmlUrl: resultArray[2].trim(),
    htmlUrl: resultArray[3].trim()
  });
}
// 保存 opml.json 和 opml.xml
fs.writeFileSync(opmlJsonPath, JSON.stringify(opmlJson, null, 2), { encoding: 'utf-8' });
const opmlXmlContent = opmlXmlContentOp
+ opmlJson.map((lineJson) => `  <outline title="${lineJson.title}" xmlUrl="${lineJson.xmlUrl}" htmlUrl="${lineJson.htmlUrl}" />\n`).join('')
+ opmlXmlContentEd;
fs.writeFileSync(opmlXmlPath, opmlXmlContent, { encoding: 'utf-8' });

// 异步处理
(async () => {

  // 用于存储各项数据
  const dataJson = [];
  
  for (const lineJson of opmlJson) {

    try {
      const feed = await parser.parseURL(lineJson.xmlUrl);
      
      // 数组合并
      dataJson.push.apply(dataJson, feed.items.filter((item) => item.title && item.content && item.pubDate).map((item) => {
        const pubDate = new Date(item.pubDate);
        return {
          name: lineJson.title,
          xmlUrl: lineJson.xmlUrl,
          htmlUrl: lineJson.htmlUrl,
          title: item.title,
          link: item.link,
          summary: item.summary,
          pubDate: pubDate,
          pubDateYYMMDD: pubDate.toISOString().split('T')[0]
        }
      }));
      
    } catch (err) {

      console.log(err);
      console.log("-------------------------");
      console.log("xmlUrl: " + lineJson.xmlUrl);
      console.log("-------------------------");
      
    }
  }
  
  // 按时间顺序排序
  dataJson.sort((itemA, itemB) => itemA.pubDate < itemB.pubDate ? 1 : -1);
  // 默认为保存前 30 项的数据
  fs.writeFileSync(dataJsonPath, JSON.stringify(dataJson.slice(0, Math.min(maxDataJsonItemsNumber, dataJson.length)), null, 2), { encoding: 'utf-8' });

})();