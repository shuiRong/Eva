const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
    'tags': {
        type: Array,
        required: true,
    }
});

const TagsModel = mongoose.model('tags', TagsSchema);

module.exports = TagsModel;