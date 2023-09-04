import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const Visualizar = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState({});
  const [mensaje, setMensaje] = useState({});

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMinutes(
      nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
    );
    return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  useEffect(() => {
    const consultarPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setPaciente(respuesta.data);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarPaciente();
  }, []);
 // Función para dividir el texto en líneas de 60 caracteres
 const dividirTextoEnLineas = (texto) => {
  const lineas = [];
  for (let i = 0; i < texto.length; i += 50) {
    lineas.push(texto.slice(i, i + 50));
  }
  return lineas.join('\n'); // Agregar saltos de línea
};
  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Visualizar Paciente
        </h1>
        <hr className="my-4" />
        <p className="mb-8">
        </p>
      </div>
      <div>
        {Object.keys(paciente).length != 0 ? (
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del paciente:{" "}
                </span>
                {paciente.nombre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del propietario:{" "}
                </span>
                {paciente.propietario}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Correo:{" "}
                </span>
                {paciente.email}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Fecha de atención:{" "}
                </span>
                {formatearFecha(paciente.ingreso)}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Fecha de salida:{" "}
                </span>
                {formatearFecha(paciente.salida)}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estado:{" "}
                </span>
                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {paciente.estado && "activo"}
                </span>
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Síntomas:{" "}
                </span>
                <pre>{dividirTextoEnLineas(paciente.sintomas)}</pre>
              </p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png"
                alt="dogandcat"
                className="h-80 w-80"
              />
            </div>
          </div>
        ) : (
          Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )
        )}
      </div>
    </>
  );
};

export default Visualizar;
