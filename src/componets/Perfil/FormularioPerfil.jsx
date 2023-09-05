import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FormularioPerfil = () => {
  const { auth, actualizarPerfil } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // Obtén el token JWT de donde lo hayas almacenado
  const charLimit = 50;
  const [initialValues, setInitialValues] = useState({
    nombre: " ",
    apellido: " ",
    direccion: " ",
    telefono: "",
    email: " ",
    password: "",
    id: "",
  });

  const initialId = auth._id; // Obtener el ID de las cookies o auth._id
 
  useEffect(() => {
    if (initialId) {
      (async function fetchData() {
        try {
          const respuesta = await (
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/perfil`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Agrega el token JWT como Bearer Token en los encabezados
                "Content-Type": "application/json",
              },
            })
          ).json();

          setInitialValues(respuesta);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [initialId]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};

          if (!values.nombre) {
            errors.nombre = "Campo obligatorio";
          } else if (values.nombre.length > charLimit) {
            errors.nombre = "El nombre debe tener como máximo 50 caracteres";
          }

          if (!values.apellido) {
            errors.apellido = "Campo obligatorio";
          } else if (values.apellido.length > charLimit) {
            errors.apellido =
              "El apellido debe tener como máximo 50 caracteres";
          }

          if (!values.direccion) {
            errors.direccion = "Campo obligatorio";
          } else if (values.direccion.length > charLimit) {
            errors.direccion =
              "La dirección debe tener como máximo 50 caracteres";
          }

          if (!values.telefono) {
            errors.telefono = "Campo obligatorio";
          } else if (!/^\d{10}$/.test(values.telefono)) {
            errors.telefono =
              "El teléfono debe contener exactamente 10 números";
          }

          if (!values.email) {
            errors.email = "Campo obligatorio";
          } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = "Ingrese un correo válido";
          } else if (values.email.length > charLimit) {
            errors.email = "El correo debe tener como máximo 50 caracteres";
          }

          return errors;
        }}
        onSubmit={async (data) => {
          let correos = [];
          const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios`;
          try {
            const respuesta = await (await fetch(url)).json();
            correos = respuesta.map((data) => data.email);
          } catch (error) {
            console.log(error);
          }
          if (!correos.includes(data.email)) {
            const resultado = await actualizarPerfil(data);
            if (resultado.tipo === true) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Información actualizada",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Problema al actualizar intenta de nuevo",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Este correo ya se encuentra en uso",
              showConfirmButton: false,
              timer: 2000,
            });
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
                Nombre:{" "}
              </label>
              <Field
                id="nombre"
                type="text"
                className={
                  "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                }
                placeholder="nombre"
                name="nombre"
                maxLength={charLimit}
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                  <Mensaje tipo={false}>{errors.nombre}</Mensaje>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.nombre.length}/{charLimit}
              </div>
            </div>
            <div>
              <label
                htmlFor="apellido"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Apellido:{" "}
              </label>
              <Field
                id="apellido"
                type="text"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                placeholder="apellido"
                name="apellido"
                maxLength={charLimit}
              />
              <ErrorMessage
                name="apellido"
                component={() => (
                  <Mensaje tipo={false}>{errors.apellido}</Mensaje>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.apellido.length}/{charLimit}
              </div>
            </div>
            <div>
              <label
                htmlFor="direccion"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Dirección:{" "}
              </label>
              <Field
                id="direccion"
                type="text"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 `}
                placeholder="direccion"
                name="direccion"
                maxLength={charLimit}
              />
              <ErrorMessage
                name="direccion"
                component={() => (
                  <Mensaje tipo={false}>{errors.direccion}</Mensaje>
                )}
              />

              <div className="text-gray-500  mb-3">
                {values.direccion.length}/{charLimit}
              </div>
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Teléfono:{" "}
              </label>
              <Field
                id="telefono"
                type="text"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 `}
                placeholder="telefono"
                name="telefono"
                maxLength={10}
              />
              <ErrorMessage
                name="telefono"
                component={() => (
                  <Mensaje tipo={false}>{errors.telefono}</Mensaje>
                )}
              />
              <div className="text-gray-500  mb-3">
                {values.telefono.toString.length}/{10}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 uppercase font-bold text-sm"
              >
                Correo:{" "}
              </label>
              <Field
                id="email"
                type="text"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                placeholder="Correo"
                name="email"
                maxLength={charLimit}
              />
              <ErrorMessage
                name="email"
                component={() => <Mensaje tipo={false}>{errors.email}</Mensaje>}
              />
              <div className="text-gray-500  mb-3">
                {values.email.length}/{charLimit}
              </div>
            </div>
            <button
              type="submit"
              className="bg-gray-800 w-full p-3 
    text-slate-300 uppercase font-bold rounded-lg 
    hover:bg-gray-600 cursor-pointer transition-all"
            >
              Actualizar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormularioPerfil;
