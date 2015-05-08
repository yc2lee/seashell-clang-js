// Test #3: Attempt to run
//
var assert = require('assert');
var fs = require('fs');

// Load the interpreter
var M = require('../interpreter/seashell-runner.js');
console.log('Test framework for Seashell LLVM runner.')

// Load test file
var fname = __dirname + "/test3.ll";
var asm = fs.readFileSync(fname, {encoding: 'utf-8'});

// Make a runner
var I = new M.SeashellInterpreter(asm);
assert.ok(I.assemble());
assert.throws(function () {I.start();}, "SSS EXIT");
assert.equal(I.result(), 5);