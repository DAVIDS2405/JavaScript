import {Router} from 'express'
import {
    actualizarPaciente,
    detallePaciente,
    eliminarPaciente,
    listarPacientes,
    registrarPaciente,
} from "../controllers/paciente_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router()

/**
 * @openapi
 * /api/pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get("/pacientes",verificarAutenticacion,listarPacientes);
/**
 * @openapi
 * /api/paciente/{id}:
 *   get:
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del paciente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get("/paciente/:id",verificarAutenticacion, detallePaciente);
/**
 * @openapi
 * /api/paciente/registro:
 *   post:
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Rocky
 *               propietario:
 *                 type: string
 *                 example: David
 *               email:
 *                 type: string
 *                 example: Magdalena
 *               celular:
 *                 type: string
 *                 example: 0990095964
 *               ingreso:
 *                 format: date
 *               sintomas:
 *                 type: string
 *                 example: Pulgas
 *               veterinario:
 *                 type: string
 *                 example: 64ac6a89e7c83c3deae079b8
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post("/paciente/registro", verificarAutenticacion,registrarPaciente);
/**
 * @openapi
 * /api/paciente/actualizar/{id}:
 *   put:
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del paciente
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Astolfo
 *               propietario:
 *                 type: string
 *                 example: Juan
 *               email:
 *                 type: string
 *                 example: Carolina
 *               celular:
 *                 type: string
 *                 example: 0990093264
 *               ingreso:
 *                 format: date
 *               sintomas:
 *                 type: string
 *                 example: Comezon y lavado
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.put("/paciente/actualizar/:id", verificarAutenticacion,actualizarPaciente);
/**
 * @openapi
 * /api/paciente/eliminar/{id}:
 *   delete:
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del paciente
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salida:
 *                 format: date
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.delete("/paciente/eliminar/:id", verificarAutenticacion,eliminarPaciente);
 

export default router