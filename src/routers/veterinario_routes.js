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
 *       - Login and Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: test123@hotmail.com
 *               password:
 *                 type: string
 *                 description: Email del usuario
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
 *       - Login and Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: test123@hotmail.com
 *               password:
 *                 type: string
 *                 description: Email del usuario
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

/**
 * @openapi
 * /api/confirmar/:token:
 *   get:
 *     tags:
 *       - Veterinario
 *     responses:
 *       200:
 *         description: User register
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

router.get('/confirmar/:token',confirmEmail)

/**
 * @openapi
 * /api/veterinarios:
 *   get:
 *     tags:
 *       - Veterinario
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
 *       - Recover Password
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
 *       - Recover Password
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
 *       - Veterinario
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
 *       - Veterinario
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No se proporcionó un token de autenticación válido.
 *       403:
 *         description: Token de autenticación válido pero no tiene acceso al perfil.
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autenticación JWT en formato 'Bearer token'
 *         required: true
 *         schema:
 *           type: string
 *           format: jwt
 */

router.get('/perfil',verificarAutenticacion,perfil)

/**
 * @openapi
 * /api/veterinario/actualizarpassword:
 *   put:
 *     tags:
 *       - Veterinario
 *     security:
 *       - bearerAuth: []
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
 *       - Veterinario
 *     security:
 *       - bearerAuth: []
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
 *       - in: header
 *         name: Authorization
 *         description: Token de autenticación JWT en formato 'Bearer token'
 *         required: true
 *         schema:
 *           type: string
 *           format: jwt
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
 *       - Recover Password
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
 *       - Veterinario
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




