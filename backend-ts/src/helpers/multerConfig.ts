import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        let fileName: string | string[] = file.originalname.split('.');
        const extension = fileName.pop();
        fileName = fileName.join().trim().split(' ').join('-');
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const uploadOptions = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (ALLOWED_FILE_TYPES.find((el: string) => el === file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});

export const uploadSingleImage = uploadOptions.single('image');
export const uploadMultipleImages = uploadOptions.array('images');
