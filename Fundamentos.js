
/*CALCULAR EL ÁREA DE UN CÍRCULO*/
const PI = 3.14;
let radio = -4.7;

if(radio < 0.0){
    radio = Math.abs(radio);
}

console.log(`El área de un círculo de radio ${radio} es: ${PI * Math.pow(radio,2)}\n\n`);



/*PROMP PARA INGRESAR DATOS Y CALCULAR EL PESO EN OTRO PLANETA*/
let peso = 14.5;
let resp = "JúpiTer"
resp = resp.toLowerCase();//transformamos cualquie respuesta a minúsculas

if(resp == "marte"){
    console.log(`Su peso en marte es ${peso * 0.3057}`)

}else if(resp == "júpiter"){
    console.log(`Su peso en júpiter es ${peso * parseFloat("2.5374")}`)

}else if (resp == "tierra"){
    console.log(`Su peso en la tierra es ${peso * 1.0}`)

}else if(resp == "mercurio"){
    console.log(`Su peso en mercurio es ${peso * 0.415}`)

}else{
    console.log("NO eleigió ninún planeta correcto")
}
console.log("\n")



/*CALCULAR SI UN EMPLEADO MERECE O NO UN INCENTIVO */
let nombreEmpleado = "Lucas";
let sueldo = 3654.0;


if(sueldo >= 2000.0 && sueldo <= 4136.0){
    sueldo += 125.0
    console.log(`Felicidades ${nombreEmpleado}, ha recibido un incentivo de 125$ y su sueldo final es de: ${sueldo}`);
}else{
    console.log("No puede recibir un incentivo")
}
console.log("\n")



/*DETERMINAR SI 3 VALORES REPRESENTAN LOS LADOS DE UN TRIÁNGULO Y CALCULAR SU ÁREA*/
let a = 13.6
let b = 7.6
let c = 8
if( (a+b < c) || (a+c < b) || (b+c < a)){
    console.log("Los lados ingresados no forman un triángulo")
}else{
    let p = (a+b+c)/2.0;
    console.log(`El área de un triángulo de lados ${a}, ${b} y ${c} es: `)
    console.log( Math.sqrt(p*(p-a)*(p-b)*(p-c)) )
}
console.log("\n")


/*PRECIO DE UN TICKET DE FERIA Y DESCUENTO SI ES LUNES AL GRUPO DE EDAD ESTANDAR (13 Y 60 AÑOS)*/
let esMartes = true;
let edad = 25;

if(esMartes && (edad >= 13 && edad <= 60) ){
    console.log("El precio de su ticket es: 25.00 USD")
}else if ( (edad >= 13 && edad <= 60) ){
    console.log("El precio de su ticket es: 30.00 USD")
}else if( edad >= 0 && edad <= 12){
    console.log("El precio de su ticket es: 15.00 USD")
}else if( edad >= 61 && edad <= 100){
    console.log("El precio de su ticket es: 20.00 USD")
}else{
    console.log("No puede entrar a este juego")
}
console.log("\n")



/*NOTA COMO STRING DE ACUERDO A UNA NOTA NUMÉRICA*/
let nota = 7;
let curso = 10//13 representa tercero de bachillerato
let statusNota = ""

switch(nota){

    case 1:
    case 2:
    case 3:
    case 4:
        statusNota = "REPROBADO"
    break;

    case 5:
    case 6:
        statusNota = "SUPLETORIOS"
    break;

    case 7:
    case 8:
    case 9:
    case 10:
        statusNota = "APROBADO"
    break;

}
if(statusNota == "APROBADO"){

    curso == 13 ? console.log("Te has Graduado y Puedes entrar a la POLI") : console.log("Pasas al siguiente año, MUY BIEN!!")
}else{
    console.log("Estudia más")
}

console.log("\n")



/*CALCULAR LA MEDIA DE ELEMENTOS DE UN ARREGLO*/

const datosCientificos = [1,23,6,9,7,0,3,6,7,45,7,55,31]
let suma = 0

for(let i = 0; i < datosCientificos.length; i++){
    suma += datosCientificos[i];
}
console.log(`La suma de los datos registrados es: ${suma}, y su promedio es: ${suma/datosCientificos.length}`)
console.log("\n")



/*Lista de productos de un minimarket */
let lista_Productos = [
    {codigo: "101", nombre: "Yogurt Natural", categoria: "Lácteo", p_Compra: 1.12, precioVenta: (1.12*120/100.0).toFixed(2), cantidad: 45},
    {codigo: "201", nombre: "Lomo Fino de Res", categoria: "Cárnico", p_Compra: 3.48, precioVenta: (3.48*120/100.0).toFixed(2), cantidad: 2},
    {codigo: "301", nombre: "Salchichas de Cerdo", categoria: "Embutido", p_Compra: 1.10, precioVenta: (1.10*120/100.0).toFixed(2), cantidad: 0}
];

for (let x of lista_Productos) {
    if(x.cantidad <= 0){
        console.log("Suministrando 10 unidades a: ", x.nombre)
    }
}
