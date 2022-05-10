const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    faculty_name : {
        type : String
    },
    course_name : {
        type : String
    },
    open_date : {
        type : String
    },
    study_time : {
        type : String
    }
})

const BlogModel = mongoose.model('data', BlogSchema)

module.exports = BlogModel

