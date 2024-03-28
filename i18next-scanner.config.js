var fs = require("fs");
var chalk = require("chalk");

module.exports = {
  input: [
    "app/**/*.{js,jsx,tsx,ts}",
    "./app/**/*.{js,jsx,tsx,ts}",
    // Use ! to filter out files or directories
    "!app/**/*.spec.{js,jsx}",
    "!app/i18n/**",
    "!**/node_modules/**",
  ],
  output: "./",
  options: {
    compatibilityJSON: "v3",
    debug: true,

    func: {
      list: ["i18next.t", "i18n.t", "useTranslation.t", "useTranslation", "t"],
      extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
      extensions: [".js", ".jsx", ".tsx"],
      fallbackKey: true,
      // fallbackKey: function (ns, value) {
      //   console.log("fallbackKey", value, ns);
      //   return value;
      // },
      acorn: {
        ecmaVersion: 2020,
        sourceType: "module", // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ["en", "cn"],
    ns: ["locale", "resource"],
    defaultLng: "en",
    defaultNs: "resource",
    defaultValue: "",
    fallbackKey: true,
    resource: {
      loadPath: "i18n/{{lng}}/{{ns}}.json",
      savePath: "i18n/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ["i18next._", "i18next.__"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false,
          })
        );
        ++count;
      }
    );
    parser.parseFuncFromString(content, function (key, options) {
      options.defaultValue = key; // use key as the value
      parser.set(key, options);
    });

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  },
};
