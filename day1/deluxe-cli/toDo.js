var program = require('commander');
var jsonfile = require('jsonfile')
var file = 'data.json'
var data = jsonfile.readFileSync(file)

program
.version('0.0.1')
//.option('-p, --add', 'Add peppers')
.option('-P, --pineapple', 'Add pineapple')
.option('-b, --bbq-sauce', 'Add bbq sauce')
.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

program.command('add <todoName> [todoNameParts...]')
.action(getName);

program.command('showall')
.action(printAllTasks);
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
                priority:1})
    console.log("Added task named: "+ name+", with id:"+data.length-1);
}
function printAllTasks(){
  for (var i=0; i<data.length; i++){
    console.log("Task #"+i+": "+data[i].name + " priority")
  }
}

//console.log(data)
jsonfile.writeFileSync(file, data);
