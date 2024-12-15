// 文件读取包
const fs = require('fs');
// 引入 RSS 解析第三方包
const Parser = require('rss-parser');
const parser = new Parser();
// 引入 RSS 生成器
const RSS = require('rss');
// 引入 SeaTableAPI
const { Base } = require('seatable-api');

// 相关配置
const opmlXmlContentTitle = 'NJU-LUG Blogroll';
const readmeMdPath = './README.md';
const opmlJsonPath = './web/src/assets/opml.json';
const dataJsonPath = './web/src/assets/data.json';
const maxDataJsonItemsNumber = 40;  // 保存前四十项
const opmlXmlPath = './web/public/opml.xml';
const rssXmlPath = './web/public/rss.xml';
const opmlXmlContentOp = '<opml version="2.0">\n  <head>\n    <title>' + opmlXmlContentTitle + '</title>\n  </head>\n  <body>\n\n';
const opmlXmlContentEd = '\n  </body>\n</opml>';
const seatableToken = process.env.SEATABLE_API_TOKEN;
// 解析 README 中的表格，转为 JSON
const pattern = /\| *([^\|]*) *\| *(http[^\|]*) *\| *(http[^\|]*) *\|/g;
const readmeMdContent = fs.readFileSync(readmeMdPath, { encoding: 'utf-8' });
// 生成 opml.json
let opmlJson = [];
let resultArray;
while ((resultArray = pattern.exec(readmeMdContent)) !== null) {
  opmlJson.push({
    title: resultArray[1].trim(),
    xmlUrl: resultArray[2].trim(),
    htmlUrl: resultArray[3].trim()
  });
}

// 解析 SeaTable 中的表格，转为 JSON
async function parseSeaTableToJson(opmlJson) {
  const seatableBase = new Base({
    server: "https://table.nju.edu.cn",
    APIToken: seatableToken
  });
  await seatableBase.auth();
  const tables = await seatableBase.getTables();
  const rows = await seatableBase.listRows(tables[0]['name']);
  rows.forEach(row => {
    if (row['Name'] && (!opmlJson.some(item => item.title === row['Name'])) && row['RSS'].startsWith('http') && row['HTML'].startsWith('http')) {
      opmlJson.push({
        title: row['Name'],
        xmlUrl: row['RSS'],
        htmlUrl: row['HTML']
      });
    }
  });
  return opmlJson;
}
(async () => {
  // 如果定义 SeaTable Token，则将 SeaTable 中的数据合并到 opmlJson 中
  if (seatableToken !== undefined && seatableToken !== '' && seatableToken !== null) {
    try {
      opmlJson = await parseSeaTableToJson(opmlJson);
    } catch (err) {
      console.log(err);
    }
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

        // 读取 RSS 的具体内容
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
            summary: item.summary ? item.summary : item.content,
            pubDate: pubDate,
            pubDateYYMMDD: pubDate.toISOString().split('T')[0]
          }
        }));

      } catch (err) {

        // 网络超时，进行 Log 报告
        console.log(err);
        console.log("-------------------------");
        console.log("xmlUrl: " + lineJson.xmlUrl);
        console.log("-------------------------");

      }
    }

    // 按时间顺序排序
    dataJson.sort((itemA, itemB) => itemA.pubDate < itemB.pubDate ? 1 : -1);
    // 默认为保存前 n 项的数据, 并保证不超过当前时间
    const curDate = new Date();
    const dataJsonSliced = dataJson.filter((item) => item.pubDate <= curDate).slice(0, Math.min(maxDataJsonItemsNumber, dataJson.length));
    fs.writeFileSync(dataJsonPath, JSON.stringify(dataJsonSliced, null, 2), { encoding: 'utf-8' });

    // 生成 RSS 文件
    var feed = new RSS({
      title: 'NJU-LUG Blogroll',
      description: '南京大学 Linux User Group 收集同学和校友们的 Blog',
      feed_url: 'https://blogroll.njulug.org/rss.xml',
      site_url: 'https://blogroll.njulug.org/',
      image_url: 'https://blogroll.njulug.org/assets/logo.56c0d74c.png',
      docs: 'https://blogroll.njulug.org/',
      managingEditor: 'NJU-LUG',
      webMaster: 'NJU-LUG',
      copyright: '2022 NJU-LUG',
      language: 'cn',
      pubDate: dataJson[0].pubDate,
      ttl: '60',
    });

    for (let item of dataJsonSliced) {
      feed.item({
        title: item.title,
        description: item.summary,
        url: item.link, // link to the item
        author: item.name, // optional - defaults to feed author property
        date: item.pubDate.toISOString(), // any format that js Date can parse.
      });
    }

    // 保存 rss.xml 文件
    const rssXmlContent = feed.xml();
    fs.writeFileSync(rssXmlPath, rssXmlContent, { encoding: 'utf-8' });
  })();
})();
