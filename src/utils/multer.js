
import multer from 'multer';

const checkValidFields = (user) => {
    const { first_name, email, password } = user;
    if(!first_name || !email || !password) {
        return false;
    } 
    else {
        return true;
    }
}

const profileMulterFilter = (request, file, cb) => {
    if(!checkValidFields(request.body)) {
        cb(null, false);
    } 
    else {
        cb(null, true);
    }
}

const profileStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "/media/multer/users/img"));
    },

    filename: function(request, file, cb) {
        cb(null, `${request.body.email}-perfil-${file.originalname}`);
    }
})

const uploadProfile = multer({storage: profileStorage, fileFilter: profileMulterFilter});

const documentsStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "/media/multer/users/documents"));
    },

    filename: function(request, file, cb) {
        cb(null, `document-${file.originalname}`);
    }
})

const uploadDocuments = multer({storage: documentsStorage});

const imgProductsStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "/media/multer/products/img"));
    },

    filename: function(request, file, cb) {
        cb(null, `${request.body.code}-product-${file.originalname}`);
    }
})

const uploadImgProducts = multer({storage: imgProductsStorage});

export { uploadProfile, uploadDocuments, uploadImgProducts };