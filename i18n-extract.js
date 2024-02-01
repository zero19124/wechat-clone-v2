const fs = require("fs");
const path = require("path");

function extractI18nFromProject(projectPath, localePath, language) {
  const i18nRegex = /i18n\.t\('([^']+)'\)/g;

  const localeFile = path.join(__dirname+localePath, `locale-${language}.js`);
  let keys = {};

  function processFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    let match;

    while ((match = i18nRegex.exec(content)) !== null) {
      const key = match[1];
      if (!keys[key]) {
        keys[key] = `// ${language} translation\n'${key}': '',\n`;
      }
    }
  }

  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        processDirectory(filePath);
      } else if (filePath.endsWith(".tsx")) {
        processFile(filePath);
      }
    });
  }
  console.log(path.resolve(__dirname, projectPath), "1");
  processDirectory(path.resolve(__dirname, projectPath));

  const localeContent = fs.existsSync(localeFile) ? require(localeFile) : {};
  localeContent[language] = { ...localeContent[language], ...keys };

  fs.writeFileSync(
    localeFile,
    `module.exports = ${JSON.stringify(localeContent, null, 2)};`,
    "utf8"
  );
}

extractI18nFromProject("./app", "/locale", "en");
