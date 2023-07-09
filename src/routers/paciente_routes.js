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
 * /api/paciente/:id:
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

router.get("/paciente/:id",verificarAutenticacion, detallePaciente);
/**
 * @openapi
 * /api/paciente/registro:
 *   post:
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

router.post("/paciente/registro", verificarAutenticacion,registrarPaciente);
/**
 * @openapi
 * /api/paciente/actualizar/:id:
 *   put:
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

router.put("/paciente/actualizar/:id", verificarAutenticacion,actualizarPaciente);
/**
 * @openapi
 * /api/paciente/eliminar/:id:
 *   delete:
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

router.delete("/paciente/eliminar/:id", verificarAutenticacion,eliminarPaciente);
 

export default router