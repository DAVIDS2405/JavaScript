import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/crearJWT.js";

passport.use(
  "auth-github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_PASSWORD,
      callbackURL: "https://backend-poly-s.onrender.com/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const profile_Json = profile._json;
        const existingUser = await Veterinario.findOne({
          githubId: profile.id,
        });
        if (existingUser) {
          const token = generarJWT(existingUser._id);
          const userWithToken = {
            token,
            nombre: existingUser?.nombre,
            apellido: existingUser?.apellido,
            direccion: existingUser?.direccion,
            telefono: existingUser?.telefono,
            _id: existingUser._id,
            password: "",
            email: existingUser?.email,
          };

          return done(null, userWithToken);
        } else {
          const newUser = new Veterinario({
            githubId: profile_Json.id,
            nombre: profile_Json?.name || "",
            apellido: "",
            password_requiered: true,
            email: profile_Json?.email || "",
            direccion: profile_Json?.location || "",
            telefono: 1,
          });
          newUser.password = await newUser.encrypPassword("");
          newUser.token = null;
          newUser.confirmEmail = true;
          await newUser.save();
          const token = generarJWT(newUser._id);
          const userWithToken = {
            token,
            nombre: newUser.nombre,
            apellido: newUser.apellido,
            direccion: newUser.direccion,
            telefono: newUser.telefono,
            _id: newUser._id,
            email: newUser.email,
          };

          done(null, userWithToken);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
