//configuration options. These make up the exercicse.
"use strict";
var jsonfile = require('jsonfile')
var file = 'data.json'
var data = jsonfile.readFileSync(file)

// Start HERE. We require the module commander we had read about in the readme.
// With this object we'll be able to parse our command line arguments
var program = require('commander');




program
.version('0.0.1')
.option('-i, --id <n>', 'Specify id of task', parseInt)
.option('-p, --priority <p>', 'Specify priority for task', parseInt)
program.command('add')
.description("create stuff")
.action(addTask)
program.command('show')
.action(showTasks);
program.command('delete')
.action(deleteTask);
program.parse(process.argv);

function parseArgs () {
  var args= program.args.splice(0, (program.args.length-1));
  return args.join(" ");
}

function addTask(){
  var priority = program.priority || 1;
  var name = parseArgs()
  data.push({'name':name,
  priority:priority,
  completed:false});
  console.log("Added task named: "+ name + ", with id: " + data.length +", and priority: "+priority);
}

function showTasks(){
  if(program.id){
    var id = program.id-1;
    console.log("Task #"+id+" Priority "+data[id].priority+ ": "+data[id].name)
  }else{
    for (var i=0; i<data.length; i++){
      console.log("Task #"+(i+1)+" Priority "+data[i].priority+ ": "+data[i].name)
    }
  }
}

function deleteTask(){
  if(program.id){
    var id = program.id-1;
    if (id>=0 && id<data.length){
      data.splice(id, 1);
      console.log("Deleted task with id: "+program.id)
    }

  }else{
      console.log("No task specified")
  }
}

jsonfile.writeFileSync(file, data);
