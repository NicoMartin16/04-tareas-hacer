const { guardarDB } = require("../helpers/guardarArchivo");
const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArray() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea)=>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto() {
        console.log();
        this.listadoArray.forEach((tarea,idx) => {
            if(tarea.completadoEn !== null){
                console.log(`${idx + 1}.`.blue + tarea.desc + ':: Completado'.blue);
            } else {
                console.log(`${idx + 1}.`.red + tarea.desc + ':: Pendiente'.red);
            }

        })
    }

    listarPendientesCompletadas(completadas = true) {

        if(completadas) {
            this.listadoArray.forEach((tarea, idx) => {
                let {completadoEn} = tarea;
                if(completadoEn !== null){
                    console.log(`${idx + 1}.`.blue + tarea.desc + ':: Completado'.blue);
                }
            });
        } else {
            this.listadoArray.forEach((tarea, idx) => {
                let {completadoEn} = tarea;
                if(completadoEn == null){
                    console.log(`${idx + 1}.`.red + tarea.desc + ':: Pendiente'.red);
                }
            })
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArray.forEach((tarea) => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;
