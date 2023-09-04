import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";


const Tabla = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);


  const [currentPage, setCurrentPage] = useState(0);
  const patientsPerPage = 10; // Cantidad de pacientes por página

  const indexOfLastPatient = (currentPage + 1) * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = pacientes.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const pageCount = Math.ceil(pacientes.length / patientsPerPage);

  const buscarPacientes = () => {
    const resultados = pacientes.filter((paciente) =>
      paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setPacientesFiltrados(resultados);
  };



  /*
  const listarPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setPacientes(respuesta.data, ...pacientes);
    } catch (error) {
      console.log(error);
    }
  };
  */

  const listarPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      const pacientesData = respuesta.data;

      setPacientes(pacientesData);

      // Si hay un término de búsqueda, filtrar la lista de pacientes
      if (busqueda !== "") {
        const filteredPacientes = pacientesData.filter((paciente) =>
          paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        setPacientesFiltrados(filteredPacientes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        "Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/paciente/eliminar/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const data = {
          salida: new Date().toString(),
        };
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Paciente eliminado",
          showConfirmButton: false,
          timer: 2000,
        });
        await axios.delete(url, { headers, data });
        listarPacientes();
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    listarPacientes();
  }, [busqueda]);


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };


/*
  return (
    <>
      <input
        type="text"
        placeholder="Buscar paciente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {busqueda === "" ? (
        pacientes.length === 0 ? (
          <Mensaje tipo={"active"}>{"No existen registros"}</Mensaje>
        ) : (
          <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
              <tr>
                <th className="p-2">N°</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Propietario</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Celular</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente, index) => (
                <tr
                  className="border-b hover:bg-gray-300 text-center"
                  key={paciente._id}
                >
                  <td>{index + 1}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.propietario}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.celular}</td>
                  <td>
                    <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {paciente.estado && "activo"}
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    <MdNoteAdd
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/visualizar/${paciente._id}`)
                      }
                    />

                    <MdInfo
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/actualizar/${paciente._id}`)
                      }
                    />

                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => {
                        handleDelete(paciente._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        // Mostrar los resultados de la búsqueda
        pacientesFiltrados.length === 0 ? (
          <Mensaje tipo={"active"}>{"No se encontraron resultados"}</Mensaje>
        ) : (
          <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
              <tr>
                <th className="p-2">N°</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Propietario</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Celular</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.map((paciente, index) => (
                <tr
                  className="border-b hover:bg-gray-300 text-center"
                  key={paciente._id}
                >
                  <td>{index + 1}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.propietario}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.celular}</td>
                  <td>
                    <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {paciente.estado && "activo"}
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    <MdNoteAdd
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/visualizar/${paciente._id}`)
                      }
                    />

                    <MdInfo
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/actualizar/${paciente._id}`)
                      }
                    />

                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => {
                        handleDelete(paciente._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </>
  );
*/
 
return (
  <>
    <input
      type="text"
      placeholder="Buscar paciente..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />

    {busqueda === "" ? (
      currentPatients.length === 0 ? (
        <Mensaje tipo={"active"}>{"No existen registros"}</Mensaje>
      ) : (
        <div>
          <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
              <tr>
                <th className="p-2">N°</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Propietario</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Celular</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((paciente, index) => (
                <tr
                  className="border-b hover:bg-gray-300 text-center"
                  key={paciente._id}
                >
                  <td>{index + 1}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.propietario}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.celular}</td>
                  <td>
                    <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {paciente.estado && "activo"}
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    <MdNoteAdd
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/visualizar/${paciente._id}`)
                      }
                    />

                    <MdInfo
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/actualizar/${paciente._id}`)
                      }
                    />

                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => {
                        handleDelete(paciente._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageCount > 1 && (
            <div className="pagination">
              {Array.from({ length: pageCount }, (_, index) => (
                <span
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`pagination-item ${
                    index === currentPage ? "active" : ""
                  }`}
                >
                  pagina {index + 1}
                </span>
              ))}
            </div>
          )}
        </div>
      )
    ) : (
      // Mostrar los resultados de la búsqueda
      pacientesFiltrados.length === 0 ? (
        <Mensaje tipo={"active"}>{"No se encontraron resultados"}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Propietario</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Celular</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.map((paciente, index) => (
              <tr
                className="border-b hover:bg-gray-300 text-center"
                key={paciente._id}
              >
                <td>{index + 1}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.propietario}</td>
                <td>{paciente.email}</td>
                <td>{paciente.celular}</td>
                <td>
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {paciente.estado && "activo"}
                  </span>
                </td>
                <td className="py-2 text-center">
                  <MdNoteAdd
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() =>
                      navigate(`/dashboard/visualizar/${paciente._id}`)
                    }
                  />

                  <MdInfo
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() =>
                      navigate(`/dashboard/actualizar/${paciente._id}`)
                    }
                  />

                  <MdDeleteForever
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                    onClick={() => {
                      handleDelete(paciente._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    )}
  </>
);


};

export default Tabla;
