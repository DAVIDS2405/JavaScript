//Funtion Declaration

function leap_year(year) {
  //The year is a multiple of 400. The year is a multiple of 4 and not a multiple of 100.

  if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
    console.log(`${year} Es bisiesto \n`);
  } else {
    console.log(`${year} No es bisiesto \n`);
  }
}

leap_year(2100);

//funtion express

const addition = function (num1, num2) {
  const total = num1 + num2
  return console.log(`La suma de ${num1} y ${num2} es = ${total}`);
};
const subtraction = function (num1, num2) {
  const total = num1 - num2;
  return console.log(`La resta de ${num1} y ${num2} es = ${total}`);
};
const multilpication = function (num1, num2) {
  const total = num1 * num2;
  return console.log(`La multiplicación de ${num1} y ${num2} es = ${total}`);
};
const division = function (num1, num2) {
  return num2 === 0
    ? console.log("No se puede divir para 0 ")
    : console.log(`La división de ${num1} y ${num2} es ${num1 / num2}  \n`);
};

addition(1.2, 0);
subtraction(1, 1);
multilpication(1, 2);
division(1, 1);


//funtion anonymous and self-executed
(function () {
  function Cm_in(Cm) {
    return centimetros / 2.54;
  }

  function Kg_Lb(Kg) {
    return kilogramos * 2.20462;
  }

  function C_F(C) {
    return (celsius * 9) / 5 + 32;
  }

  // Example
  const centimetros = 100;
  const pulgadas = Cm_in(centimetros);
  console.log(`${centimetros} centímetros son ${pulgadas} pulgadas.`);

  const kilogramos = 75;
  const libras = Kg_Lb(kilogramos);
  console.log(`${kilogramos} kilogramos son ${libras} libras.`);

  const celsius = 25;
  const fahrenheit = C_F(celsius);
  console.log(
    `${celsius} grados Celsius son ${fahrenheit} grados Fahrenheit. \n`
  );
})();
//funtion arrow

const password_generator = (Length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let new_password = "";

  for (let i = 0; i < Length; i++) {
    index = Math.floor(Math.random() * characters.length);
    new_password += characters.charAt(index);
  }

  return new_password;
};

const new_password = password_generator(13);
console.log(new_password + "\n");
