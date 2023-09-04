import { Link } from "react-router-dom";
import { useState } from "react";
import Mensaje from "../componets/Alertas/Mensaje";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const [mensaje, setMensaje] = useState({});

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Campo obligatorio")
      .max(50, "El nombre debe tener como máximo 50 caracteres"),
    apellido: Yup.string()
      .required("Campo obligatorio")
      .max(50, "El apellido debe tener como máximo 50 caracteres"),
    direccion: Yup.string()
      .required("Campo obligatorio")
      .max(50, "La dirección debe tener como máximo 50 caracteres"),
    telefono: Yup.string()
      .required("Campo obligatorio")
      .matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 números")
      .test(
        "is-numeric",
        "El teléfono debe contener solo números",
        (value) => /^\d+$/.test(value)
      ),
    email: Yup.string()
      .required("Campo obligatorio")
      .email("Ingrese un correo válido")
      .max(50, "El correo debe tener como máximo 50 caracteres"),
    password: Yup.string().required("Campo obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const url = "http://localhost:3000/api/registro";
        const respuesta = await axios.post(url, values);
        setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Confirma tu cuenta",
          showConfirmButton: false,
          timer: 2000,
        });
        formik.resetForm();
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    },
  });

  const handleTelefonoChange = (e) => {
    const cleanedValue = e.target.value.replace(/\D/g, ""); // Remover caracteres no numéricos
    formik.setFieldValue("telefono", cleanedValue);
  };

  return (
    <>
      <div className="bg-white flex justify-center items-center w-1/2">
        <div className="md:w-4/5 sm:w-full">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">
            BIENVENIDO
          </h1>
          <small className="text-gray-400 block my-4 text-sm">
            Por favor ingresa tus datos
          </small>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="nombre"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu nombre"
                className={`block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500 ${
                  formik.touched.nombre && formik.errors.nombre
                    ? "border-red-500"
                    : ""
                }`}
                maxLength="50"
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 text-sm">
                  {formik.errors.nombre}
                </div>
              )}
              <div className="text-gray-500 text-sm">
                Caracteres restantes: {50 - formik.values.nombre.length}
              </div>
            </div>

            <div className="mb-3">
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="apellido"
              >
                Apellido:
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu apellido"
                className={`block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500 ${
                  formik.touched.apellido && formik.errors.apellido
                    ? "border-red-500"
                    : ""
                }`}
                maxLength="50"
              />
              {formik.touched.apellido && formik.errors.apellido && (
                <div className="text-red-500 text-sm">
                  {formik.errors.apellido}
                </div>
              )}
              <div className="text-gray-500 text-sm">
                Caracteres restantes: {50 - formik.values.apellido.length}
              </div>
            </div>

            <div className="mb-3">
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="direccion"
              >
                Dirección:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu dirección"
                className={`block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500 ${
                  formik.touched.direccion && formik.errors.direccion
                    ? "border-red-500"
                    : ""
                }`}
                maxLength="50"
              />
              {formik.touched.direccion && formik.errors.direccion && (
                <div className="text-red-500 text-sm">
                  {formik.errors.direccion}
                </div>
              )}
              <div className="text-gray-500 text-sm">
                Caracteres restantes: {50 - formik.values.direccion.length}
              </div>
            </div>

            <div className="mb-3">
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="telefono"
              >
                Teléfono:
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formik.values.telefono}
                onChange={handleTelefonoChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu teléfono"
                className={`block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500 ${
                  formik.touched.telefono && formik.errors.telefono
                    ? "border-red-500"
                    : ""
                }`}
                maxLength="10"
              />
              {formik.touched.telefono && formik.errors.telefono && (
                <div className="text-red-500 text-sm">
                  {formik.errors.telefono}
                </div>
              )}
              <div className="text-gray-500 text-sm">
                Números ingresados: {formik.values.telefono.replace(/\D/g, "").length}
              </div>
            </div>

            <div className="mb-3">
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="email"
              >
                Correo:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu correo"
                className={`block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500 ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : ""
                }`}
                maxLength="50"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
              <div className="text-gray-500 text-sm">
                Caracteres restantes: {50 - formik.values.email.length}
              </div>
            </div>

            <div className="mb-3">
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="password"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="********************"
                className={`block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
              >
                Registrar
              </button>
            </div>
          </form>

          <div className="mt-5 text-xs border-b-2 py-4 "></div>

          <div className="mt-3 text-sm flex justify-end items-center">
            <Link
              to="/login"
              className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 text-right"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-1/2 h-screen bg-[url('/public/images/dogregister.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden"
      ></div>
    </>
  );
};
