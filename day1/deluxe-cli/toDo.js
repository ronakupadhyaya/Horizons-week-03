var program = require('commander');
var jsonfile = require('jsonfile')
var file = 'data.json'
var data = jsonfile.readFileSync(file)
//https://github.com/jprichardson/node-jsonfile
program
.version('0.0.1')
//.option('-p, --add', 'Add peppers')
.option('-i, --id <n>', 'Specify id of task', parseInt)
//.option('-b, --bbq-sauce', 'Add bbq sauce')
//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

program.command('add <todoName> [todoNameParts...]')
.action(getName);

program.command('priority <priority>')
.action(setPriority);

program.command('show')
.action(showTasks);
program.parse(process.argv);

/*
console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
*/

function getName (todoName, todoNameParts) {
  var name=todoName;
  if (todoNameParts) {
    todoNameParts.forEach(function (oDir) {
      name += " "+oDir;
    });
  }
  addTask(name)
}

function addTask(name){
  data.push({'name':name,
  priority:1,
  completed:false})
  console.log("Added task named: "+ name+", with id:"+data.length-1);
}
function showTasks(){
  if(program.id){
    var id = program.id-1;
    console.log("Task #"+id+": "+data[id].name + " priority: "+data[id].priority)
  }else{
    for (var i=0; i<data.length; i++){
      console.log("Task #"+(i+1)+": "+data[i].name + " priority")
    }
  }
}

function setPriority(priority){
  var id = program.id;
  console.log(id);
  console.log(priority)
}

//console.log(program.id);//correctly getting global id
//console.log(data) //all data
jsonfile.writeFileSync(file, data);
