const nombre = "Camiseta";
const precio = 29.99;
const material = "Algodón";
const coloresDisponibles = ["rojo", "azul", "negro"];
const tallasDisponibles = ["S", "M", "L", "XL"];
const fabricante = "Marca XYZ";


// nombre abreviado de propiedades 
const producto = {
  nombre,
  precio,
  material,
  coloresDisponibles,
  tallasDisponibles,
  detalles: {
    fabricante
  },
  calcularPrecioDescuento(porcentajeDescuento) {
    const descuento = this.precio * (porcentajeDescuento / 100);
    const precioFinal = this.precio - descuento;
    return precioFinal;
  }
};

console.log("--------Nombres abreviados---------");
console.log(producto);

console.log("--------Acceder a sus claves-------");
console.log(producto.nombre); 
console.log(producto.precio); 
console.log(producto.detalles.fabricante); 


console.log("--------Agregar nueva propiedad-------");
producto.fabricante = "GUCCI";
console.log(producto);

console.log("--------Eliminar una propiedad-------");
delete producto.material;
console.log(producto);

console.log("--------Destructuracion de un Objeto-------");
const { coloresDisponibles: colores, tallasDisponibles: tallas } = producto;
console.log(colores); 
console.log(tallas); 

console.log("--------Congelar un objeto-------");

console.log("Freeze");
Object.freeze(producto);
console.log(Object.isFrozen(producto));
console.log(producto);

console.log("Seal");
Object.seal(producto);
console.log(Object.isSealed(producto))
console.log(producto);

console.log("--------Copiar dos Objetos-------");
const addinformation={
    origen : "Ecuador",
    garantia : 1
};
const alliformaton_prod = { ...producto , ...addinformation};
console.log(alliformaton_prod);

console.log("--------Uso del this en objetos -------");
const Descuento ={ calcularPrecioDescuento : function(porcentajeDescuento) {
    const des = this.precio * (porcentajeDescuento / 100);
    const precioFinal = this.precio - descuento;
    return precioFinal;
}
};
const inforcon_desc= { ...producto , ...Descuento};
console.log(inforcon_desc);
console.log(producto.calcularPrecioDescuento(10)); 

