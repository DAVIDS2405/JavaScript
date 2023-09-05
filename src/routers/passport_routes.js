import { Router } from "express";
import passport from "passport";

const loginRouter = Router()

loginRouter.get(
  "/github",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  })
);
loginRouter.get(
  "/github/callback",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  }),(req,res) =>{
    const user = JSON.stringify(req.user)
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
        window.opener.postMessage(${user}, 'https://frontend-poly-system.onrender.com')
      </script>
    </html>`);
  }
);
export { loginRouter }