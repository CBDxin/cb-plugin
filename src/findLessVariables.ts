import * as fs from 'fs';

const LESS_VARIABLES_REG =  /(\@[^:\s]+):([^;]+);/g;

interface IVariables {
  [key:string]:string;
}

export default function findLessVariables(lessPath: string){
  const variables:IVariables = {};
  if(fs.existsSync(lessPath)){
    const content = fs.readFileSync(lessPath, 'utf-8');
    let matched;
    while((matched = LESS_VARIABLES_REG.exec(content)) !== null){
      variables[matched[1]] = matched[2];
    }
  }

  return variables;
}