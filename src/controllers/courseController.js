import Course from '../models/course.js'

const courseGetAll = async (req, res) => {
    const courses = await Course.findAll()
    courses.length > 0 ? res.status(200).send(courses) : res.status(404).send({ message: 'No course found' })
}

const courseGetCourses = async (req, res) => {
    const { id } = req.params
    const courses = await Course.findAll({
        where: {
            studentId: id
        }
    })
    courses.length > 0 ? res.status(200).send(courses) : res.status(404).send(false)
}

const courseGetOne = async (req, res) => {
    const { id } = req.params
    const course = await Course.findByPk(id)
    course ? res.status(200).send(course) : res.status(404).send({ message: 'Course not found' })
}

const courseInsertOne = async (req, res) => {
    const data = req.body
    const course = await Course.create(data)
    course ? res.status(201).send(course) : res.status(400).send({ message: 'Course not created' })
}

const coursePatchOne = async (req, res) => {
    const data = req.body
    const { id } = req.params
    const course = await Course.findByPk(id)
    course.set(data)
    await course.save()
    res.send(course)
}

const courseDeleteOne = async (req, res) => {
    const { id } = req.params
    const course = await Course.findByPk(id)
    await course.destroy()
    res.send(course)
}

export { courseDeleteOne, courseGetAll, courseGetOne, courseInsertOne, coursePatchOne, courseGetCourses }