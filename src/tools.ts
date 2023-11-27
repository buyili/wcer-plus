import * as fs from "fs"
var Module = require('module')
export function requirePath(filename:string):any {
  if(!fs.existsSync(filename)) {
    throw new TypeError('Not found manifest file!')
  }
  let code:string = fs.readFileSync(filename, 'utf8')
  let mod = new Module(filename)
  mod.filename = filename
  mod._compile(code, filename)
  mod.paths = Module._nodeModulePaths(filename)
  return mod.exports
}

export function findEntryOption(entryOptions: Array<EntryOption>, filename: string){
  if(!entryOptions) return null
  return entryOptions.find(item=>{
    if(item.filename && filename.indexOf(item.filename) != -1) return true
    if(item.pattern && item.pattern.test(filename)) return true
    return false
  })
}
