import * as csvSync from 'csv-parse/lib/sync'
import * as jdistsUtil from 'jdists-util'
import * as yaml from 'js-yaml'
interface ICsvAttrs extends jdistsUtil.IAttrs {
  /**
   * 表头信息
   */
  headers?: string
}
/**
 * csv 数据解析
 *
 * @param content 文本内容
 * @param attrs 属性
 * @param attrs.header
 * @return 返回渲染后的结果
 * @example processor():base
  ```js
  let attrs = {}
  let scope = {}
  console.log(processor(
`name, age
Tom, 17`, attrs, scope).trim())
  // > - name: Tom
  // >   age: 17
  ```
 * @example processor():headers is null
  ```js
  let attrs = {
    headers: null,
  }
  let scope = {
    execImport: function () {
      return null
    }
  }
  console.log(processor(
`name, age
Tom, 17`, attrs, scope).trim())
  // > - - name
  // >   - age
  // > - - Tom
  // >   - 17
  ```
 * @example processor():headers is string
  ```js
  let attrs = {
    headers: 'f1,f2'
  }
  let scope = {
    execImport: function (importion) {
      return importion
    }
  }
  console.log(processor(
`Jason, 20
Tom, 17`, attrs, scope).trim())
  // > - f1: Jason
  // >   f2: 20
  // > - f1: Tom
  // >   f2: 17
  ```
 * @example processor():headers is array
  ```js
  let attrs = {
    headers: ['f1', 'f2']
  }
  let scope = {
    execImport: function (importion) {
      return importion
    }
  }
  console.log(processor(
`Jason,20
Tom,17`, attrs, scope).trim())
  // > - f1: Jason
  // >   f2: 20
  // > - f1: Tom
  // >   f2: 17
  ```
 * @example processor():content is null
  ```js
  let attrs = {}
  let scope = {}
  console.log(processor(null, attrs, scope))
  // > null
  ```
 */
export = (function (content: string, attrs: ICsvAttrs, scope: jdistsUtil.IScope): string {
  if (!content) {
    return content
  }
  let data = csvSync(content, {
    trim: true,
    auto_parse: true,
  }) as string[][]
  let headers: string[]
  if (attrs.headers === undefined) {
    headers = data.shift()
  } else {
    let t = scope.execImport(attrs.headers, true)
    if (typeof t === 'string') {
      headers = csvSync(t, {
        trim: true,
      })[0]
    } else if (t instanceof Array) {
      headers = t
    }
  }
  let result
  if (headers) {
    result = data.map((record) => {
      let item = {}
      record.forEach((sub, index) => {
        item[headers[index]] = sub
      })
      return item
    })
  } else {
    result = data
  }
  return yaml.safeDump(result)
}) as jdistsUtil.IProcessor
