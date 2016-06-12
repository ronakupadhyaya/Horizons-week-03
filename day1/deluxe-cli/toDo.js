var program = require('commander');
var jsonfile = require('jsonfile')
var file = 'data.json'
var data = jsonfile.readFileSync(file)
//https://github.com/jprichardson/node-jsonfile

// Usage
// node toDo.js add Do Stuff -p 3
// node toDo.ks add Do Stuff
// node todo.js
// node todo.js
// node todo.js
// node todo.js
// node todo.js

program
.version('0.0.1')
//.option('-p, --add', 'Add peppers')
.option('-i, --id <n>', 'Specify id of task', parseInt)
.option('-p, --priority <p>', 'Specify priority for task', parseInt)


//.option('-b, --bbq-sauce', 'Add bbq sauce')
//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

program.command('add')
.description("create stuff")
.action(addTask)

//program.command('priority <for>')
//.action(setPriority);


program.command('show')
.action(showTasks);

program.command('delete')
.action(deleteTask);

program.parse(process.argv);

/*
console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
*/

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

function setPriority(priority){
  var id = program.id;
  console.log(id);
  console.log(priority)
}


//console.log(program.args)

//console.log(program.id);//correctly getting global id
//console.log(data) //all data
jsonfile.writeFileSync(file, data);
