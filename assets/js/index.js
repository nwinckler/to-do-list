let tareas = [
    {id: 1, nombreTarea: "Hacer la cama", realizado: false},
    {id: 2, nombreTarea: "Comprar verduras", realizado: false},
    {id: 3, nombreTarea: "Estudiar JS", realizado: false},
    {id: 4, nombreTarea: "Comprar carbón", realizado: false}
];

const cuentaRealizadas = ()=>{
    let tareasRealizadas = tareas.filter(tarea => tarea.realizado === true);
    document.querySelector("#cantidadTareasRealizadas").innerHTML = `Tareas Realizadas: ${tareasRealizadas.length}`;
}

const limpiaInput =() =>{
    document.querySelector("input").value = '';
}


const listaActual = () =>{
    let html = "";
    if(tareas.length === 0){
        html += `
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
            `
            document.querySelector("#cantidadTotalTareas").innerHTML = `Total Tareas: 0`;
            document.querySelector("#cantidadTareasRealizadas").innerHTML = `Tareas Realizadas: 0`;

            listadoTareas.innerHTML = html;
    }else{
        tareas.forEach((tarea)=>{
            html += `
                <tr>
                    <td>${tarea.id}</td>
                    <td>${tarea.nombreTarea}</td>
                    <td><input type='checkbox' onclick='realizarTarea(${tarea.id})' ${tarea.realizado === true ? "checked" : null}></td>
                    <td><button onclick='eliminarTarea(${tarea.id})'>Eliminar</button></td>
                </tr>
            `
            document.querySelector("#cantidadTotalTareas").innerHTML = `Total Tareas: ${tareas.length}`;
            
            cuentaRealizadas();
            listadoTareas.innerHTML = html;
        })
    }
}

const realizarTarea = (id) =>{
    let tareaIndex = tareas.findIndex((tarea) => tarea.id === id);
    tareas[tareaIndex].realizado = !tareas[tareaIndex].realizado;
    cuentaRealizadas();
}

const eliminarTarea = (id) =>{
    let tareaIndex = tareas.findIndex((tarea) => tarea.id === id);
    console.log(tareas.length);
    if(tareas.length !== 1){
        tareas.splice(tareaIndex,1);
    }else{
        tareas.shift();
    }
    listaActual();
}

const btn = document.querySelector("#agregar");

const lista = document.querySelector("#listadoTareas");

btn.addEventListener("click", ()=>{
    let nombreTareaNueva = document.querySelector("input").value;

    //Reviso si el nombre de la nueva tarea existe para evitar tareas duplicadas:
    let revisionTareas = tareas.findIndex(tarea => tarea.nombreTarea === nombreTareaNueva)
    //console.log(revisionTareas)

    if(revisionTareas !== -1 ){
        window.alert("La tarea ya existe, ingresa una nuevamente")
        limpiaInput();
    }else{
        let arrayId = [];
        tareas.forEach((tarea)=>{
            arrayId.push(tarea.id)
        })
        
        //Genero el nuevo Id y reviso si es que el arreglo contiene elementos 
        let newId = 0;
        if(tareas.length === 0){
            newId = 1;
        } else{
            let maxArrayId = arrayId.reduce((accumulator, currentValue) => {
                return Math.max(accumulator, currentValue);
            }, arrayId[0]);
            newId = maxArrayId + 1;
        }

        let nuevaTarea = {id: (newId),nombreTarea: nombreTareaNueva, realizado: false};

        tareas.push(nuevaTarea);
        limpiaInput();
        listaActual();
    }
})

listaActual();

