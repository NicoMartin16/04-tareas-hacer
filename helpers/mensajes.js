require("colors");

const mostrarMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log("=========================".blue);
    console.log("Seleccione una opción".blue);
    console.log("=========================\n".blue);

    console.log(`${"1.".blue} Crear tarea`);
    console.log(`${"2.".blue} Listar tareas`);
    console.log(`${"3.".blue} Listar Tareas completadas`);
    console.log(`${"4.".blue} Listar tareas pendientes`);
    console.log(`${"5.".blue} Completar tarea(s)`);
    console.log(`${"6.".blue} Borrar tareas`);
    console.log(`${"0.".blue} salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve, reject) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".blue} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
