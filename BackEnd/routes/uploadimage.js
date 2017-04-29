const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'uploads/images/',
})

router.route('/')
    .post(upload.single('image'), (req, res) => {
        const data = req.body;
        console.log('+++++', req.file);
        res.json({
            'path': 'images/' + req.file.filename,
        });
    });

module.exports = router;