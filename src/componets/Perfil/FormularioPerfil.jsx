import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import Cookies from "js-cookie";

const FormularioPerfil = () => {
  const { auth, actualizarPerfil } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});
  const charLimit = 50;

  const initialId = Cookies.get("perfilId") || auth._id; // Obtener el ID de las cookies o auth._id

  const validate = (values) => {
    const errors = {};

    if (!values.nombre) {
      errors.nombre = "Campo obligatorio";
    } else if (values.nombre.length > charLimit) {
      errors.nombre = "El nombre debe tener como máximo 50 caracteres";
    }

    if (!values.apellido) {
      errors.apellido = "Campo obligatorio";
    } else if (values.apellido.length > charLimit) {
      errors.apellido = "El apellido debe tener como máximo 50 caracteres";
    }

    if (!values.direccion) {
      errors.direccion = "Campo obligatorio";
    } else if (values.direccion.length > charLimit) {
      errors.direccion = "La dirección debe tener como máximo 50 caracteres";
    }

    if (!values.telefono) {
      errors.telefono = "Campo obligatorio";
    } else if (!/^\d{10}$/.test(values.telefono)) {
      errors.telefono = "El teléfono debe contener exactamente 10 números";
    }

    if (!values.email) {
      errors.email = "Campo obligatorio";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Ingrese un correo válido";
    } else if (values.email.length > charLimit) {
      errors.email = "El correo debe tener como máximo 50 caracteres";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: initialId, // Usar el valor de initialId
      nombre: Cookies.get("perfilNombre") || auth.nombre || "", // Utilizar el valor de auth.nombre si está disponible
      apellido: Cookies.get("perfilApellido") || auth.apellido || "", // Utilizar el valor de auth.apellido si está disponible
      direccion: Cookies.get("perfilDireccion") || auth.direccion || "", // Utilizar el valor de auth.direccion si está disponible
      telefono: Cookies.get("perfilTelefono") || auth.telefono || "", // Utilizar el valor de auth.telefono si está disponible
      email: Cookies.get("perfilEmail") || auth.email || "", // Utilizar el valor de auth.email si está disponible
    },
    validate,
    onSubmit: async (values) => {
      // Actualizar el valor en las cookies
      Cookies.set("perfilId", values.id);

      const resultado = await actualizarPerfil(values);
      setMensaje(resultado);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Información actualizada",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        setMensaje({});
      }, 3000);
    },
  });

  // Guardar los valores del formulario en cookies cada vez que cambien
  useEffect(() => {
    Cookies.set("perfilNombre", formik.values.nombre);
    Cookies.set("perfilApellido", formik.values.apellido);
    Cookies.set("perfilDireccion", formik.values.direccion);
    Cookies.set("perfilTelefono", formik.values.telefono);
    Cookies.set("perfilEmail", formik.values.email);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}

      <div>
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre:{" "}
        </label>
        <input
          id="nombre"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
            !formik.isValid && formik.touched.nombre ? "border-red-500" : ""
          }`}
          placeholder="nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={charLimit}
        />
        {formik.touched.nombre && formik.errors.nombre ? (
          <div className="text-red-500 text-sm">{formik.errors.nombre}</div>
        ) : null}
        <div className="text-gray-500 text-sm">
          Caracteres restantes: {charLimit - formik.values.nombre.length}
        </div>
      </div>

      <div>
        <label
          htmlFor="apellido"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Apellido:{" "}
        </label>
        <input
          id="apellido"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
            !formik.isValid && formik.touched.apellido ? "border-red-500" : ""
          }`}
          placeholder="apellido"
          name="apellido"
          value={formik.values.apellido}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={charLimit}
        />
        {formik.touched.apellido && formik.errors.apellido ? (
          <div className="text-red-500 text-sm">{formik.errors.apellido}</div>
        ) : null}
        <div className="text-gray-500 text-sm">
          Caracteres restantes: {charLimit - formik.values.apellido.length}
        </div>
      </div>

      <div>
        <label
          htmlFor="direccion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Dirección:{" "}
        </label>
        <input
          id="direccion"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
            !formik.isValid && formik.touched.direccion ? "border-red-500" : ""
          }`}
          placeholder="direccion"
          name="direccion"
          value={formik.values.direccion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={charLimit}
        />
        {formik.touched.direccion && formik.errors.direccion ? (
          <div className="text-red-500 text-sm">{formik.errors.direccion}</div>
        ) : null}
        <div className="text-gray-500 text-sm">
          Caracteres restantes: {charLimit - formik.values.direccion.length}
        </div>
      </div>

      <div>
        <label
          htmlFor="telefono"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Teléfono:{" "}
        </label>
        <input
          id="telefono"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
            !formik.isValid && formik.touched.telefono ? "border-red-500" : ""
          }`}
          placeholder="telefono"
          name="telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={10}
          onKeyPress={(e) => {
            // Permite solo dígitos y evita otros caracteres
            const onlyNumbers = /^[0-9\b]+$/;
            if (!onlyNumbers.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {formik.touched.telefono && formik.errors.telefono ? (
          <div className="text-red-500 text-sm">{formik.errors.telefono}</div>
        ) : null}
        <div className="text-gray-500 text-sm">
          Números restantes: {10 - formik.values.telefono.length}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Correo:{" "}
        </label>
        <input
          id="email"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
            !formik.isValid && formik.touched.email ? "border-red-500" : ""
          }`}
          placeholder="Correo"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={charLimit}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
        <div className="text-gray-500 text-sm">
          Caracteres restantes: {charLimit - formik.values.email.length}
        </div>
      </div>

      <input
        type="submit"
        className="bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        value="Actualizar"
        disabled={!formik.isValid}
      />
    </form>
  );
};

export default FormularioPerfil;
