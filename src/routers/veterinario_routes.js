import {Router} from 'express'
import verificarAutenticacion from '../middlewares/autenticacion.js'
import {
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
} from "../controllers/veterinario_controller.js";


const router = Router()
/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Login and Register Vet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: 
 *               email:
 *                 type: string
 *                 example: test123@hotmail.com
 *               password:
 *                 type: string
 *                 example: 123456
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
router.post('/login',login)
/**
 * @openapi
 * /api/registro:
 *   post:
 *     tags:
 *       - Login and Register Vet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: David
 *               apellido:
 *                 type: string
 *                 example: Basantes
 *               direccion:
 *                 type: string
 *                 example: Magdalena
 *               telefono:
 *                 type: string
 *                 example: 0990095964
 *               email:
 *                 type: string
 *                 example: test123@hotmail.com
 *               password:
 *                 type: string
 *                 example: 123456
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
router.post('/registro',registro)

router.get('/confirmar/:token',confirmEmail)

/**
 * @openapi
 * /api/veterinarios:
 *   get:
 *     tags:
 *       - Veterinario coming soon
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

router.get('/veterinarios',listarVeterinarios)

/**
 * @openapi
 * /api/recuperar-password:
 *   post:
 *     tags:
 *       - Recover Password coming soon
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

router.post('/recuperar-password',recuperarPassword)

/**
 * @openapi
 * /api/recuperar-password/:token:
 *   get:
 *     tags:
 *       - Recover Password coming soon
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

router.get('/recuperar-password/:token',comprobarTokenPasword)

/**
 * @openapi
 * /api/nuevo-password/:token:
 *   post:
 *     tags:
 *       - Veterinario coming soon
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

router.post('/nuevo-password/:token',nuevoPassword)

/**
 * @openapi
 * /api/perfil:
 *   get:
 *     summary: Obtener perfil del veterinario autenticado
 *     tags:
 *       - Veterinario coming soon
 *     responses:
 *       200:
 *         description: Perfil del veterinario obtenido exitosamente.
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

router.get('/perfil',verificarAutenticacion,perfil)

/**
 * @openapi
 * /api/veterinario/actualizarpassword:
 *   put:
 *     tags:
 *       - Veterinario coming soon
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

router.put('/veterinario/actualizarpassword',verificarAutenticacion,actualizarPassword)

/**
 * @openapi
 * /api/veterinario/:id:
 *   get:
 *     tags:
 *       - Veterinario coming soon
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a obtener. 
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
router.get('/veterinario/:id',verificarAutenticacion,detalleVeterinario)/**
 * @openapi
 * /api/recuperar-password:
 *   post:
 *     tags:
 *       - Recover Password coming soon
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

/**
 * @openapi
 * /api/veterinario/:id:
 *   put:
 *     tags:
 *       - Veterinario coming soon
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

router.put('/veterinario/:id',verificarAutenticacion,actualizarPerfil)



export default router




