function getGreeting() {
  return 'Hello';
}

function getGreeting2() {
  return 'Hello2';
}

//expose only what you want to
module.exports = {
  getGreeting: getGreeting,
  getGreeting2: getGreeting2
}
