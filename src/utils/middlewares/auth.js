import passport from "passport";

export const authenticate  = (strategy) => { 
    const passportAuthenticate = async(request, response, next) => {
        passport.authenticate(strategy, {session: false}, (err, user, info) => {
            if(err) return next(err); 
            
            if(!user && strategy != "signupLocalStrategy" && strategy != "signupGithubStrategy") {
                return response.redirect("/api/sessions/login");
            }

            request.user = user;
            next();
        })(request, response, next)
    }
    
    return passportAuthenticate;
}

export const authorize = (role, render=false, renderPage="") => { 
    return async(request, response, next) => {
        if(!request.user) {
            return render ? 
            response.status(401).render(renderPage, {error: "Usuario no autenticado"}) 
            : 
            response.status(401).json({error: "Usuario no autenticado"});  
        }

        if(!role.includes(request.user.role)) {
            return render ?
            response.status(403).render(renderPage, {error: "Permisos insuficientes"})
            :
            response.status(403).json({error: "Permisos insuficientes"});
        };
        next();
    }
}