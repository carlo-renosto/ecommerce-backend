import passport from "passport";

export const authenticate  = (strategy) => { 
    const passportAuthenticate = async(request, response, next) => {
        passport.authenticate(strategy, {session: false}, (err, user, info) => {
            if(err) return next(err);

            if(!user) {
                return response.redirect("/api/sessions/login");
            }
            
            request.user = user;
            next();
        })(request, response, next)
    }
    
    return passportAuthenticate;
};

export const authorize = (role) => { 
    return async(request, response, next) => {
        if(!request.user) return response.status(401).json({error: "Usuario no autenticado"});

        if(request.user.role !== role) {
            return response.status(403).json({error: "Permisos insuficientes"});
        };
        next();
    };
};