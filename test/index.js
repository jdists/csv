
global.processor = require('../')
      

describe("src/index.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("processor():base", function () {
    examplejs_printLines = [];
  let attrs = {}
  let scope = {}
  examplejs_print(processor(
`name, age
Tom, 17`, attrs, scope).trim())
  assert.equal(examplejs_printLines.join("\n"), "- name: Tom\n  age: 17"); examplejs_printLines = [];
  });
          
  it("processor():headers is null", function () {
    examplejs_printLines = [];
  let attrs = {
    headers: null,
  }
  let scope = {
    execImport: function () {
      return null
    }
  }
  examplejs_print(processor(
`name, age
Tom, 17`, attrs, scope).trim())
  assert.equal(examplejs_printLines.join("\n"), "- - name\n  - age\n- - Tom\n  - 17"); examplejs_printLines = [];
  });
          
  it("processor():headers is string", function () {
    examplejs_printLines = [];
  let attrs = {
    headers: 'f1,f2'
  }
  let scope = {
    execImport: function (importion) {
      return importion
    }
  }
  examplejs_print(processor(
`Jason, 20
Tom, 17`, attrs, scope).trim())
  assert.equal(examplejs_printLines.join("\n"), "- f1: Jason\n  f2: 20\n- f1: Tom\n  f2: 17"); examplejs_printLines = [];
  });
          
  it("processor():headers is array", function () {
    examplejs_printLines = [];
  let attrs = {
    headers: ['f1', 'f2']
  }
  let scope = {
    execImport: function (importion) {
      return importion
    }
  }
  examplejs_print(processor(
`Jason,20
Tom,17`, attrs, scope).trim())
  assert.equal(examplejs_printLines.join("\n"), "- f1: Jason\n  f2: 20\n- f1: Tom\n  f2: 17"); examplejs_printLines = [];
  });
          
  it("processor():content is null", function () {
    examplejs_printLines = [];
  let attrs = {}
  let scope = {}
  examplejs_print(processor(null, attrs, scope))
  assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];
  });
          
});
         