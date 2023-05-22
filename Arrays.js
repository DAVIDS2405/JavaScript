
/*Libreta de contatos*/
const ContactosPersonales = [
  { nombre: "Miguel", celular: "123456789", correo: "miguel@gmail.com" },
  { nombre: "Jose", celular: "987654321", correo: "jose@gmail.com" },
];

const ContatosTrabajo = [
  { nombre: "David", celular: "195634637", correo: "david@gmail.com" },
  { nombre: "Pedro", celular: "987655128", correo: "pedro@gmail.com" },
];

// Spread operator
const allContactos = [...ContactosPersonales, ...ContatosTrabajo];
console.log(allContactos);

/*EVENTOS*/
const amigos = ["Peter", "Juan", "Luisa", "Anahi", "Mateus"];
const servicios = ["Comida","Bebidas", "DJ", "Fotografo", "Decoracion"];
const desconocidos = ["Maria", "Anderzon", "Gabriel"];

console.log("Número de amigos que asisitiran al evento:", amigos.length);
console.log("Número de servicios del evento:", servicios.length);
console.log("Número de peronas desconocidas que asistiran al evento:", desconocidos.length);

/*gestionar el stock de diferentes tipos de aparatos*/
const devices = [
    { aparato: "Smartphone", cantidad: 20 },
    { aparato: "TV", cantidad: 10 },
    { aparato: "Laptop", cantidad: 15 },
    { aparato: "Tablet", cantidad: 5 },
  ];
  
  // Primera forma de iterar sobre los elementos de un arreglo
  for (let i = 0; i < devices.length; i++) {
    console.log(`Aparato: ${devices[i].aparato} - Cantidad: ${devices[i].cantidad}`);
  }
  
  // Segunda forma de iterar sobre los elementos de un arreglo
  devices.forEach((device) =>
    console.log(`Aparato: ${device.aparato} - Cantidad: ${device.cantidad}`)
  );
  
  // Tercera forma de iterar sobre los elementos de un arreglo y crear un nuevo arreglo
  const nuevo = devices.map((e) => ({
    ...e,
    message: `El aparato ${e.name} tiene una cantidad de ${e.quantity}`,
  }));
  console.log(nuevo);
  

/*Registro de empleados*/
const listaEmpleados = ["Miguel", "Carapaz", 21, true, { ciudad: "Quito" }];
const habilidadesRequeridas = ["programación", "atención al cliente"];
const numeroEmpleado = 1001;

// Agregar al final del arreglo
listaEmpleados.push(habilidadesRequeridas);
// Agregar al inicio del arreglo
listaEmpleados.unshift(numeroEmpleado);
console.log(listaEmpleados);
// Elimina el elemento del final del arreglo
listaEmpleados.pop(listaEmpleados)
// Elimina el elemento del inicio del arreglo
listaEmpleados.shift(listaEmpleados)
console.log(profileUser);

const empleados = ["Miguel","Juan","Pedro","Jose","David"]

// método find
const empleadoUno = empleados.find((e)=>e==="Miguel")
console.log(empleadoUno);

const empleadoDos = friends.find((e)=>e==="Miguel999")
console.log(empleadoDos);

// método findIndex
const encontrar = empleados.findIndex((f)=>f==="Marta")
console.log(encontrar)

// método filter
const NuevoempleadoUno = empleados.filter((e)=>e.startsWith('D'))
const NuevoempleadoDos = empleados.filter((e)=>e!='David')
console.log(NuevoempleadoUno);
console.log(NuevoempleadoDos);

const empleadosNuevos = ["Peter","Juan","Luisa","Anahi","Mateus",'Pablo']
const habilidades = ["Programador","Atencion al cliente","Base de datos","Diseño","Programador",'Analista']
// método concat
const Informacion = empleadosNuevos.concat(habilidades)
console.log(Informacion);

//Includes
console.log(listaEmpleados.includes(21))
console.log(listaEmpleados.includes(['Base de datos']))

/*Carreras de Universidad*/
const estudiantes = [
    { nombre: "Jose", edad: 20, carrera: "Medicina" },
    { nombre: "Miguel", edad: 21, carrera: "Ingeniería" },
    { nombre: "Mateo", edad: 22, carrera: "Derecho" },
    { nombre: "Carlos", edad: 19, carrera: "Arquitectura" },
  ];
  
  const verificaEdad = estudiantes.some((estudiante) => estudiante.edad >= 21);
  console.log(verificaEdad);
  
  const verificaCarrera = estudiantes.some(
    (estudiante) => estudiante.carrera === "Medicina");
  console.log(verificaCarrera);
  
// Todos los elementos deben cumplir la condición
const todosCumplen = estudiantes.every((estudiante) => estudiante.edad >= 18);
console.log(todosCumplen); 

// Al menos un elemento debe cumplir la condición
const alMenosUnoCumple = estudiantes.some((estudiante) => estudiante.edad >= 25);
console.log(alMenosUnoCumple);
//metodo reverse
console.log(listaEmpleados.reverse())
//metodo sort
console.log(listaEmpleados.sort())
//metodo reduce
/*INVENTARIO*/
const inventario = [
    { producto: "Camisa", cantidad: 10, precio: 25 },
    { producto: "Pantalón", cantidad: 5, precio: 40 },
    { producto: "Zapatos", cantidad: 8, precio: 60 },
  ];
  
  const totalProductos = inventario.reduce((acumulador, actual) => acumulador + actual.cantidad, 0);
  console.log("Total de productos en el inventario: ", totalProductos);
  
  const valorInventario = inventario.reduce((acumulador, actual) => acumulador + (actual.cantidad * actual.precio), 0);
  console.log("Valor total del inventario: ", valorInventario);

/*Lista de empleados*/

const NuevalistaEmpleados = ["Miguel", "Carapaz", 21, true, { ciudad: "Quito" }, ["🖥️", "📷", "🎧"]];

const [nombre, apellido, edad, activo, direccion, habilidad] = NuevalistaEmpleados;

console.log(nombre);
console.log(apellido);
console.log(edad);
console.log(activo);
console.log(direccion);
console.log(habilidad);

// Saltar el valor en un arreglo
const [computadora, , camara] = ['🖥️', '📷', '🎧'];
console.log(computadora);
console.log(camara);

// Desestructurando un arreglo anidado
const dispositivos = ['🖥️', '📷', '🎧', ['⌚️']];
const mercado = dispositivos[3];
const reloj = mercado[0];
console.log(reloj);

//Rest
const [televisor, camara2, ...rest] = ['📺', '📷', '🎮', '📱', '💻', '⌚️', '🖨️'];

console.log(televisor);
console.log(camara2);
console.log(rest);