const mongoose = require('mongoose');

const NewBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false,
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true,
    }
});

let NewBlogModel = mongoose.model('blog', NewBlogSchema);

module.exports = NewBlogModel;