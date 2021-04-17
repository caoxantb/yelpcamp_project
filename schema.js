const JOI = require('joi');

module.exports.campgroundSchema = JOI.object({
    campground: JOI.object({
        title: JOI.string().required(),
        price: JOI.number().required().min(0),
        // image: JOI.string().required(),
        location: JOI.string().required(),
        description: JOI.string().required()
    }).required(),
    deleteImages: JOI.array()
});

module.exports.reviewSchema = JOI.object({
    review: JOI.object({
        rating: JOI.number().required(),
        body: JOI.string().required()
    }).required()
});