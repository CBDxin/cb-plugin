import * as fs from 'fs';

interface IAlias {
  [key:string]:{
    value:string,
    desc:string
  };
}

const ALIAS_REG = /\/\*[\s]*alias:([^:.\s]+)[\s]*desc:([^:.\s]+)[\s]*\*\/[\s]*\.([^:.\s]+)[\s]*{/g;

export default function findClassAlias(lessPath: string){
  const alias:IAlias = {}
  if(fs.existsSync(lessPath)){
    const content = fs.readFileSync(lessPath, 'utf-8');
    let matched;
    while((matched = ALIAS_REG.exec(content)) !== null){
      alias[matched[1]] = {
        desc:matched[2],
        value:matched[3]
      }
    }
  }

  return alias;
}