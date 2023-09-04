import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import Mensaje from './Alertas/Mensaje';
import Swal from "sweetalert2";

export const Formulario = ({ paciente }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const charLimit = 50;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('Campo obligatorio')
      .max(charLimit, `El nombre no puede tener más de ${charLimit} caracteres`),
    propietario: Yup.string()
      .required('Campo obligatorio')
      .max(charLimit, `El nombre del propietario no puede tener más de ${charLimit} caracteres`),
    email: Yup.string()
      .required('Campo obligatorio')
      .email('Ingrese un correo válido')
      .max(charLimit, `El correo no puede tener más de ${charLimit} caracteres`),
    celular: Yup.string()
      .matches(/^\d{10}$/, 'El número de celular debe tener 10 dígitos')
      .nullable(),
    convencional: Yup.string()
      .matches(/^\d{10}$/, 'El número convencional debe tener 10 dígitos')
      .nullable(),
    salida: Yup.date(),
    sintomas: Yup.string()
      .max(500, 'El campo de síntomas no puede tener más de 500 caracteres'),
  });

  return (
    <Formik
      initialValues={{
        nombre: paciente?.nombre || '',
        propietario: paciente?.propietario || '',
        email: paciente?.email || '',
        celular: paciente?.celular || '',
        convencional: paciente?.convencional || '',
        salida: paciente?.salida ? new Date(paciente?.salida).toLocaleDateString('en-CA', { timeZone: 'UTC' }) : '',
        sintomas: paciente?.sintomas || '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const token = localStorage.getItem('token');
          values.veterinario = auth._id;

          if (paciente?._id) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`;
            const options = {
              headers: {
                method: 'PUT',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Paciente actualizado",
            showConfirmButton: false,
            timer: 2000,
          });
            await axios.put(url, values, options);
          } else {
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
            const options = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };
            
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Paciente registrado",
              showConfirmButton: false,
              timer: 2000,
            });
            
            await axios.post(url, values, options);
          }

          navigate('/dashboard/listar');
        } catch (error) {
          setMensaje({ respuesta: error.response.data.msg, tipo: false });
          setTimeout(() => {
            setMensaje({});
          }, 3000);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors, touched, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <div>
            <label
              htmlFor="nombre"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Nombre de la mascota:{' '}
            </label>
            <Field
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre de la mascota"
              maxLength={charLimit}
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                errors.nombre && touched.nombre ? 'border-red-500' : ''
              }`}
            />
            <div className="text-gray-500 text-sm mb-2">
              Caracteres restantes: {charLimit - values.nombre.length}
            </div>
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="propietario"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Nombre del propietario:{' '}
            </label>
            <Field
              type="text"
              id="propietario"
              name="propietario"
              placeholder="Nombre del propietario"
              maxLength={charLimit}
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                errors.propietario && touched.propietario ? 'border-red-500' : ''
              }`}
            />
            <div className="text-gray-500 text-sm mb-2">
              Caracteres restantes: {charLimit - values.propietario.length}
            </div>
            <ErrorMessage
              name="propietario"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Correo:{' '}
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Correo del propietario"
              maxLength={charLimit}
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                errors.email && touched.email ? 'border-red-500' : ''
              }`}
            />
            <div className="text-gray-500 text-sm mb-2">
              Caracteres restantes: {charLimit - values.email.length}
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="celular"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Celular:{' '}
            </label>
            <Field
              type="tel"
              id="celular"
              name="celular"
              placeholder="Celular del propietario"
              maxLength={10}
              onKeyPress={(e) => {
                // Permite solo dígitos y evita otros caracteres
                const onlyNumbers = /^[0-9\b]+$/;
                if (!onlyNumbers.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                errors.celular && touched.celular ? 'border-red-500' : ''
              }`}
            />
            <div className="text-gray-500 text-sm mb-2">
              Dígitos restantes: {10 - values.celular.length}
            </div>
            <ErrorMessage
              name="celular"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="convencional"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Convencional:{' '}
            </label>
            <Field
              type="tel"
              id="convencional"
              name="convencional"
              placeholder="Convencional del propietario"
              maxLength={10}
              onKeyPress={(e) => {
                // Permite solo dígitos y evita otros caracteres
                const onlyNumbers = /^[0-9\b]+$/;
                if (!onlyNumbers.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                errors.convencional && touched.convencional ? 'border-red-500' : ''
              }`}
            />
            <div className="text-gray-500 text-sm mb-2">
              Dígitos restantes: {10 - values.convencional.length}
            </div>
            <ErrorMessage
              name="convencional"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="salida"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Fecha de salida:{' '}
            </label>
            <Field
              type="date"
              id="salida"
              name="salida"
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
            />
          </div>
          <div>
            <label
              htmlFor="sintomas"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Síntomas:{' '}
            </label>
            <textarea
              id="sintomas"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
              placeholder="Ingrese los síntomas de la mascota"
              name="sintomas"
              value={values.sintomas}
              onChange={(event) => {
                const sintomas = event.target.value;
                if (sintomas.length <= 500) {
                  setFieldValue('sintomas', sintomas);
                }
              }}
            />
            <div className="text-gray-500 text-sm mb-2">
              Caracteres restantes: {500 - values.sintomas.length}
            </div>
            <ErrorMessage
              name="sintomas"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all"
            disabled={isSubmitting}
          >
            {paciente?._id ? 'Actualizar paciente' : 'Registrar paciente'}
          </button>
        </form>
      )}
    </Formik>
  );
};
