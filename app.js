require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

const main = async () => {
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquireMenu();
        switch (opt) {
            case "1":
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                tareas.listarPendientesCompletadas();
                break;
            case "4":
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":
                const ids = await mostrarListadoCheckList(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if (id !== "0") {
                    const ok = await confirmar("Esta seguro que desea borrarlo?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArray);

        await pausa();
    } while (opt !== "0");
};

main();
