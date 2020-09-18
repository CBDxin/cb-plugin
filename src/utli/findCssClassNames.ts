import * as fs from 'fs';

const CLSAANAME_REG =  /[\s]*\.([^:\s]+)[\s]*{/g;


export default function findClassNames(lessPath: string){
  const classNames:string[] = [];
  if(fs.existsSync(lessPath)){
    const content = fs.readFileSync(lessPath, 'utf-8');
    let matched;
    while((matched = CLSAANAME_REG.exec(content)) !== null){
      classNames.push(matched[1])
    }
  }

  return classNames;
}