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
    server: "https://tableproxy.do1e.cn",
    APIToken: seatableToken
  });
  // 解析错误类型：身份验证错误 / HTTP 错误 / 网络连接错误 / 其他
  function classifyAndLogError(err) {
    let msg = '与 SeaTable 通信时发生错误。';

    if (err && err.response && err.response.status) {
      const status = err.response.status;
      if (status === 401 || status === 403) {
        msg = 'Seatable API Token 无效或权限不足，请检查环境变量 SEATABLE_API_TOKEN 是否正确设置，并确认 Token 是否有权限访问对应 Base。';
      } else {
        msg = `Seatable 返回 HTTP ${status}，请检查服务器状态与 API 地址（server 配置）。`;
      }
    } else if (err && err.code) {
      const netCodes = ['ENOTFOUND', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'EHOSTUNREACH'];
      if (netCodes.includes(err.code)) {
        msg = `网络错误 (${err.code})：无法连接到 SeaTable 服务器，请检查网络连通性或 server 配置。`;
      } else {
        msg = `请求失败 (${err.code})：${err.message || err}`;
      }
    } else if (err && err.message && err.message.includes('getaddrinfo')) {
      msg = `DNS 解析失败：无法解析 SeaTable 主机名，请检查网络或 server 配置。`;
    } else if (err && err.message) {
      msg = `错误：${err.message}`;
    } else {
      msg = `未知错误：${String(err)}`;
    }
    console.error(msg);
  }

  // 失败重试
  async function retrySeaTableOperation(operation, operationName, maxRetries = 10) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (err) {
        console.error(`${operationName} 第 ${attempt} 次尝试失败：`);
        classifyAndLogError(err);

        if (attempt === maxRetries) {
          console.error(`${operationName} 已达到最大重试次数 (${maxRetries})，操作失败。`);
          exit(1);
        }

        // 等待一段时间后重试，使用指数退避策略
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 30000); // 最长等待30秒
        console.log(`等待 ${waitTime}ms 后进行第 ${attempt + 1} 次重试...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  await retrySeaTableOperation(
    () => seatableBase.auth(),
    '身份验证'
  );

  let tables = await retrySeaTableOperation(
    () => seatableBase.getTables(),
    '获取表格列表'
  );

  let rows = await retrySeaTableOperation(
    () => seatableBase.listRows(tables[0]['name']),
    `读取表 "${tables && tables[0] && tables[0].name}" 的行数据`
  );
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
