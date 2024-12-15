// 文件读取包
const fs = require('fs');
// 引入 SeaTableAPI
const { Base } = require('seatable-api');
// exit函数
const { exit } = require('process');

// 相关配置
const seatableToken = process.env.SEATABLE_API_TOKEN;
const readmeMdPath = './README.md';
// 读取 README.md
const readmeMdContent = fs.readFileSync(readmeMdPath, { encoding: 'utf-8' });

// 解析 SeaTable 中的表格，转为 JSON
async function parseSeaTableToJson() {
  const seatableBase = new Base({
    server: "https://table.nju.edu.cn",
    APIToken: seatableToken
  });
  try {
    await seatableBase.auth();
} catch (err) {
    console.log('Seatable API Token 无效，请检查环境变量 SEATABLE_API_TOKEN 是否正确设置。');
    exit(1);
  }
  const tables = await seatableBase.getTables();
  const rows = await seatableBase.listRows(tables[0]['name']);
  const rows_reverse = rows.reverse();
  var opmlJson = [];
  rows_reverse.forEach(row => {
    // 根据Name去重并保留最后一个
    if (row['Name'] && !(opmlJson.find((item) => item.title === row['Name']))) {
      if (opmlJson.find((item) => item.htmlUrl === row['HTML'])) {
        return;
      }
      opmlJson.push({
        title: row['Name'],
        xmlUrl: row['RSS'],
        htmlUrl: row['HTML']
      });
    }
  });
  return opmlJson.reverse();
}


(async () => {
  // 从 SeaTable 中读取数据
  const opmlJson = await parseSeaTableToJson();

  // 更新 README.md 中的表格内容
  const tableStart = readmeMdContent.indexOf('| --   | --  | --   |') + 22;
  const tableEnd = readmeMdContent.indexOf('## OPML') - 2;
  const tableContent = opmlJson.map((lineJson) => `| ${lineJson.title} | ${lineJson.xmlUrl} | ${lineJson.htmlUrl} |`).join('\n') + '\n';
  const newReadmeMdContent = readmeMdContent.slice(0, tableStart) + tableContent + readmeMdContent.slice(tableEnd);
  fs.writeFileSync(readmeMdPath, newReadmeMdContent, { encoding: 'utf-8' });
})();
