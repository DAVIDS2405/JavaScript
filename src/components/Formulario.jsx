import Mensajes from "./Mensajes";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const Formulario = ({ setEstado, idMetro, handleClearIdMetro }) => {
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    sector: "",
    salida: "",
    llegada: "",
    maquinista: "",
    detalles: "",
    id: 0,
  });
  
  const maxCharactersTextArea = 500;
  const maxCharactersInputs = 20;

  const validateDetalles = (value) => {
    let error;
    
    return error;
  }; 
  const handleClearDatos = () => {
    setInitialValues({
      nombre: "",
      sector: "",
      salida: "",
      llegada: "",
      maquinista: "",
      detalles: "",
      id: "",
    });
    handleClearIdMetro();

   
  };

  useEffect(() => {
    if (idMetro) {
      (async function fetchData() {
        try {
          const respuesta = await (
            await fetch(
              `https://64d98140e947d30a260a1e99.mockapi.io/metro/${idMetro}`
            )
          ).json();
          setInitialValues(respuesta);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [idMetro]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validate={(data) => {
          let error = {};

          if (!data.nombre) {
            error.nombre = "Ingresa un nombre de la ruta";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.nombre)) {
            error.nombre = "Solo puede contener letras y espacios";
          }
          if (!data.sector) {
            error.sector = "Ingresa la ruta";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.sector)) {
            error.sector = "Solo puede contener letras y espacios";
          }

          if (!data.salida) {
            error.salida = "Ingresa el punto de salida";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.salida)) {
            error.salida = "Solo puede contener letras y espacios";
          }

          if (!data.llegada) {
            error.llegada = "Ingresa el punto de llegada";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.llegada)) {
            error.llegada = "Solo puede contener letras y espacios";
          }

          if (!data.maquinista) {
            error.maquinista = "Ingresa el nombre del maquinista";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.maquinista)) {
            error.maquinista = "Solo puede contener letras y espacios";
          }

          return error;
        }}
        onSubmit={async (data, { resetForm }) => {
          try {
            if (data.id) {
              const url = `https://64d98140e947d30a260a1e99.mockapi.io/metro/${data.id}`;
              await fetch(url, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              setEstado(true);
              setTimeout(() => {
                setEstado(false);
              }, 1000);

              Swal.fire({
                position: "center",
                icon: "success",
                title: "La ruta a se actualizado",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              let nombres = [];
              const url = "https://64d98140e947d30a260a1e99.mockapi.io/metro";
              try {
                const respuesta = await (
                  await fetch(
                    "https://64d98140e947d30a260a1e99.mockapi.io/metro"
                  )
                ).json();
                nombres = respuesta.map((data) => data.nombre);
              } catch (error) {
                console.log(error);
              }

              if (!nombres.includes(data.nombre)) {
                data.id = uuidv4();
                await fetch(url, {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: { "Content-Type": "application/json" },
                });

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "La ruta a se a creado con exito",
                  showConfirmButton: false,
                  timer: 2000,
                });
                setEstado(true);
                setTimeout(() => {
                  resetForm();
                  setEstado(false);
                }, 1000);
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "La ruta ya existe",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <div>
              <label
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Nombre:{""}
              </label>

              <Field
                id="nombre"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2"
                placeholder="Nombre de la ruta"
                name="nombre"
                maxLength={maxCharactersInputs}
              />

              <ErrorMessage
                name="nombre"
                component={() => (
                  <Mensajes tipo="text-red-500">{errors.nombre}</Mensajes>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.nombre.length}/{maxCharactersInputs}
              </div>
            </div>

            <div>
              <label
                htmlFor="sector"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Sector:{" "}
              </label>
              <Field
                id="sector"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2"
                placeholder="Sector de la ruta"
                name="sector"
                maxLength={maxCharactersInputs}
              />
              <ErrorMessage
                name="sector"
                component={() => (
                  <Mensajes tipo="text-red-500">{errors.sector}</Mensajes>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.sector.length}/{maxCharactersInputs}
              </div>
            </div>

            <div>
              <label
                htmlFor="salida"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Punto de salida:{" "}
              </label>
              <Field
                id="salida"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2"
                placeholder="Punto de salida"
                name="salida"
                maxLength={maxCharactersInputs}
              />

              <ErrorMessage
                name="salida"
                component={() => (
                  <Mensajes tipo="text-red-500">{errors.salida}</Mensajes>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.salida.length}/{maxCharactersInputs}
              </div>
            </div>

            <div>
              <label
                htmlFor="llegada"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Punto de llegada:{" "}
              </label>
              <Field
                id="llegada"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2"
                placeholder="Punto de llegada"
                name="llegada"
                maxLength={maxCharactersInputs}
              />

              <ErrorMessage
                name="llegada"
                component={() => (
                  <Mensajes tipo="text-red-500">{errors.llegada}</Mensajes>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.llegada.length}/{maxCharactersInputs}
              </div>
            </div>

            <div>
              <label
                htmlFor="maquinista"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Nombre del maquinista:{" "}
              </label>
              <Field
                id="maquinista"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2"
                placeholder="Nombre del maquinista"
                name="maquinista"
                maxLength={maxCharactersInputs}
              />

              <ErrorMessage
                name="maquinista"
                component={() => (
                  <Mensajes tipo="text-red-500">{errors.maquinista}</Mensajes>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.maquinista.length}/{maxCharactersInputs}
              </div>
            </div>
            <div>
              <label
                htmlFor="detalles"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Detalles:{" "}
              </label>
              <Field
                as="textarea"
                id="detalles"
                name="detalles"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2"
                maxLength={maxCharactersTextArea}
              />
              <div className="text-gray-500  mb-3">
                {values.detalles.length}/{maxCharactersTextArea}
              </div>
            </div>

            {values.id ? (
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-sky-900 hover:bg-sky-800 text-white font-semibold py-2 px-4 mt-2 rounded-xl transform transition-transform motion-reduce:transform-none motion-safe:hover:scale-110"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mt-2 rounded-xl transform transition-transform motion-reduce:transform-none motion-safe:hover:scale-110 ml-2"
                  onClick={handleClearDatos}
                >
                  No actualizar
                </button>
              </div>
            ) : (
              <section className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-sky-900 hover:bg-sky-800 text-white font-semibold py-2 px-4 mt-2 rounded-xl transform transition-transform motion-reduce:transform-none motion-safe:hover:scale-110 "
                >
                  Registrar
                </button>
              </section>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
