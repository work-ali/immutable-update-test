//TODO: export your immutable update function from this file!
function update(sourceObject, change) {
  let obj = copyObject(sourceObject);
  Object.keys(change).map(function (key) {
    let currentObject = obj;
    let changeObject = change[key];
    let currentKey = "";
    let command = {};
    if (iscommandKey(key)) {
      command = { command: key, value: change[key] };
    } else {
      command = { key, value: change[key] };
    }
    while (!command.command) {
      if (command.key) {
        const key = command.key;
        if (typeof currentObject[key] === "object") {
          currentObject[key] = copyObject(currentObject[key]);
          if (!(currentObject[key] instanceof Array))
            currentObject = currentObject[key];
        }
        currentKey = key;
        changeObject = command.value;
        command = isCommandObject(changeObject);
      } else {
        break;
      }
    }
    switch (command.command) {
      case "$set": {
        if (!currentKey) {
          obj = command.value;
        } else {
          currentObject[currentKey] = command.value;
        }
        break;
      }
      case "$apply": {
        if (!currentKey) {
          obj = command.value(obj);
        }
        currentObject[currentKey] = command.value(currentObject[currentKey]);
        break;
      }
      case "$merge": {
        let o = !currentKey ? obj : currentObject[currentKey];
        for (let a in command.value) {
          o[a] = command.value[a];
        }
        break;
      }
      case "$splice": {
        let o = !currentKey ? obj : currentObject[currentKey];
        if (!(o instanceof Array)) throw new Error("Invalid update object.");
        for (let a in command.value) {
          o.splice.apply(o, command.value[a]);
        }
        break;
      }
      case "$unshift": {
        let o = !currentKey ? obj : currentObject[currentKey];
        if (!(o instanceof Array)) throw new Error("Invalid update object.");
        o.unshift.apply(o, command.value);
        break;
      }
      case "$push": {
        let o = !currentKey ? obj : currentObject[currentKey];
        if (!(o instanceof Array)) throw new Error("Invalid update object.");
        o.push.apply(o, command.value);
        break;
      }
      default: {
        throw new Error("Invalid update object.");
      }
    }
  });
  return obj;
}

function copyObject(source) {
  if (source instanceof Array) return Object.assign([], source);
  else if (typeof source == "object") return Object.assign({}, source);
  else return source;
}

function isCommandObject(obj) {
  const key = Object.keys(obj)[0];
  if (key[0] === "$") return { command: key, value: obj[key] };
  return { key, value: obj[key] };
}

function iscommandKey(key) {
  return key[0] === "$";
}

module.exports = update;
