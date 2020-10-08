import * as fs from "fs";

const postcss = require("postcss");
const syntax = require("postcss-less");
const safe = require("postcss-safe-parser");

// const CLSAANAME_REG = /[\s]*\.([^:\s]+)[\s]*{/g;
const classNameRegex: RegExp = /[.]([\w-]+)/g;
 
const findClassNames = async(lessPath: string) => {
	const classNames: string[] = [];
	if (fs.existsSync(lessPath)) {
		const content = fs.readFileSync(lessPath, "utf-8");
		const cssAst = await postcss().process(content, {
			syntax,
			parser: safe,
			from: lessPath,
		});

		getCssSelector(cssAst?.root.nodes, classNames);

		// const content = fs.readFileSync(lessPath, "utf-8");
		// let matched;
		// while ((matched = CLSAANAME_REG.exec(content)) !== null) {
		// 	classNames.push(matched[1]);
		// }
	}

	return classNames;
}

function getCssSelector(nodes:any[], classNames:string[]){
  nodes.forEach((rule: any) => {
    if (rule.type === "rule") {
      if(rule.nodes.length){
        getCssSelector(rule.nodes, classNames);
      }

      rule?.selectors?.forEach((selector: string) => {
        let item = classNameRegex.exec(selector);
        while (item) {
          if(classNames.indexOf(item[1]) === -1){
            classNames.push(item[1]);
          }
          item = classNameRegex.exec(selector);
        }
      });
    }
  });
}

export default findClassNames;