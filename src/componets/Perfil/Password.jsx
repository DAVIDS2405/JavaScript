import { useState,useEffect } from "react";
import Mensaje from "../Alertas/Mensaje";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Swal from "sweetalert2";
const Password = () => {
  const { actualizarPassword } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // Obtén el token JWT de donde lo hayas almacenado
  const [solicitarPasswordActual, setSolicitarPasswordActual] = useState(false);
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    passwordactual: "",
    passwordnuevo: "",
  });
  useEffect(() => {
    (async function fetchData() {
      try {
        const respuesta = await (
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/perfil`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        ).json();

        // Acceder al campo de contraseña
        const password = respuesta.password_requiered;
        console.log(password);
        setSolicitarPasswordActual(password);

      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(solicitarPasswordActual === true){
      if (form.passwordnuevo.length < 6) {
        setMensaje({
          respuesta: "El password debe tener mínimo 6 carácteres",
          tipo: false,
        });
        setTimeout(() => {
          setMensaje({});
        }, 3000);
        return;
      }
      form.passwordactual = "";
      const resultado = await actualizarPassword(form);
      setMensaje(resultado);
      // Limpia el formulario
      setForm({
        passwordactual: "",
        passwordnuevo: "",
      });

      setTimeout(() => {
        setMensaje({});
        setSolicitarPasswordActual(false);
      }, 3000);
    }
    else{
      if (Object.values(form).includes("")) {
        setMensaje({
          respuesta: "Todos los campos deben ser ingresados",
          tipo: false,
        });
        setTimeout(() => {
          setMensaje({});
        }, 3000);
        return;
      }
      if (form.passwordnuevo.length < 6) {
        setMensaje({
          respuesta: "El password debe tener mínimo 6 carácteres",
          tipo: false,
        });
        setTimeout(() => {
          setMensaje({});
        }, 3000);
        return;
      }

      const resultado = await actualizarPassword(form);
      setMensaje(resultado);
      // Limpia el formulario
      setForm({
        passwordactual: "",
        passwordnuevo: "",
      });

      setTimeout(() => {
        setMensaje({});
      }, 3000);
    } 
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="font-black text-4xl text-gray-500">Contraseña</h1>
        <hr className="my-4" />
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        {!solicitarPasswordActual ? (
          <div>
            <label
              htmlFor="passwordactual"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Contraseña actual:{" "}
            </label>
            <input
              id="passwordactual"
              type="password"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
              placeholder="**************"
              name="passwordactual"
              value={form.passwordactual}
              onChange={handleChange}
            />
          </div>
        ) : null}

        <div>
          <label
            htmlFor="passwordnuevo"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Nueva contraseña:{" "}
          </label>
          <input
            id="passwordnuevo"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
            placeholder="**************"
            name="passwordnuevo"
            value={form.passwordnuevo}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="bg-gray-800 w-full p-3 
    text-slate-300 uppercase font-bold rounded-lg 
    hover:bg-gray-600 cursor-pointer transition-all"
          value="Actualizar"
        />
      </form>
    </>
  );
};

export default Password;
