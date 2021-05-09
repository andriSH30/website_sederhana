const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

const Banner = mongoose.model('banner', BannerSchema);
module.exports = Banner;