//  getSvg.js 读取svg文件夹下的svg生成svg导出文件
var fs = require("fs");
var path = require("path");
//存放svg文件的文件夹路径
const svgDir = path.resolve(__dirname, "./../keyboard-panel/");

// 读取SVG文件夹下所有svg
function readSvgs() {
  return new Promise((resolve, reject) => {
    fs.readdir(svgDir, function (err, files) {
      if (err) reject(err);
      Promise.all(
        files.map((filename) => {
          return filename;
        })
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  });
}

// 生成js文件
readSvgs()
  .then((data) => {
    let svgFiles = data.filter((item) => item.indexOf(".svg") != -1); //去除.DS_Store
    let exportFile = "import React, { Component } from 'react';\n";
    const names = [];
    svgFiles.map((item) => {
      //组建名为图标名称首字母大写
      let name = item.replace(".svg", "");
      name = name.charAt(0).toUpperCase() + name.slice(1);

      if (name.includes("-")) {
        name = name
          .split("-")
          .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
          .join("");
      }
      names.push(name);

      //svg所在的路径
      exportFile += `
                import ${name + "P"} from '../keyboard-panel/${item}';
                const ${name} =(props)=> <  ${name + "P"} {...props} />;
            `;
    });
    exportFile += `export default {${names.join(",")}}`;
    //生成的文件名及其路径
    fs.writeFile(
      path.resolve(__dirname, "./svgs.tsx"),
      exportFile,
      function (err) {
        if (err) throw new Error(err);
      }
    );
  })
  .catch((err) => {
    throw new Error(err);
  });
