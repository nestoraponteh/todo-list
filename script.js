const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let list
const fechas = new Date()
fecha.innerHTML = fechas.toLocaleDateString('es-EC',{weekday:'long', month:'short', day:'numeric'})

//function agregar tarea

function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){
        return
    }

    const listo = realizado ? check : uncheck;
    const line = realizado ? lineThrough : '';

    const elemento = `<li id = "elemento">
                      <i class="far ${listo}" data="realizado" id="${id}"></i>
                      <p class="text ${line}">${tarea}</p>
                      <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                      </li>
                      `
        lista.insertAdjacentHTML("beforeend", elemento);
    }

    function tareaRealizada(element){
        element.classList.toggle(check)
        element.classList.toggle(uncheck)
        element.parentNode.querySelector('.text').classList.toggle(lineThrough)
        list[element.id].realizado = list[element.id].realizado ? false : true
    }

    function tareaEliminada(element){
        element.parentNode.parentNode.removeChild(element.parentNode)
        list[element.id].eliminado = true
    }   
    

    botonEnter.addEventListener('click',()=> {
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea, id, false, false)
            list.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false 
            })
        }
        localStorage.setItem('todo', JSON.stringify(list))
        input.value = ''
        id++
    });
    
    document.addEventListener('keyup', function(event){
        if(event.key == 'Enter'){
            const tarea = input.value
            if(tarea){
                agregarTarea(tarea, id, false, false)
                list.push({
                    nombre: tarea,
                    id: id,
                    realizado: false,
                    elminado: false 
                })
            }
        localStorage.setItem('todo', JSON.stringify(list))
        input.value =''
        id++
        }
    });

    lista.addEventListener('click', function(event){
        const element = event.target
        const elementData = element.attributes.data.value
       
        if(elementData === 'realizado'){
            tareaRealizada(element)
        }
        else if (elementData === 'eliminado'){
            tareaEliminada(element)
        }
        localStorage.setItem('todo', JSON.stringify(list))
    })


    let data = localStorage.getItem('todo')
     if(data){
        list = JSON.parse(data)
        id = list.length
        cargarLista(list)
     } else {
        list = []
        id = 0
     }

     function cargarLista(datas){
        datas.forEach(function(i){
            agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
        })
     }