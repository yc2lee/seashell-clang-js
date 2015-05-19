var clang = require('../compiler/seashell-clang.js');
var runner = require('../interpreter/seashell-runner.js');
var diag = require('./diagnostic.js');
var fs = require('fs');
var stdout = "";
var runtime_buffer = fs.readFileSync('../compiler/crt/seashell-crt.bc');
var runtime = runtime_buffer.toString('binary');

runner._RT_stdout_write = function (string) {
  stdout += string;
  console.log(string);
};


/** Tests basic Hello World */
exports.testHelloWorld = function (test) {
  var start = new Date().getTime();
  // Compile
  var cc = clang.seashell_compiler_make();
  clang.seashell_compiler_add_file(cc, '/working/test-hello-world.c');
  test.equal(clang.seashell_compiler_run(cc), 0);
  diag.print_diagnostics(clang, cc, ['test-hello-world.c']);
  var result = clang.seashell_compiler_get_object(cc);
  clang.seashell_compiler_free(cc);

  // Interpret
  var run = new runner.SeashellInterpreter();
  test.ok(run.assemble(result));
  test.ok(run.assemble(runtime));
  test.equal(run.run(), false);
  test.equal(run.result(), 0);
  test.equal(stdout, "Hello World!\n");
  run.delete();
  
  var finished = new Date().getTime();

  // Finish
  test.done();
};