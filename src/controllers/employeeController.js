import Employee from '../models/employee.js'

const employeeGetAll = async (req, res) => {
    const employees = await Employee.findAll()
    employees.length > 0 ? res.status(200).send(employees) : res.status(404).send({ message: 'No employee found' })
}

const employeeGetOne = async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findByPk(id)
    employee ? res.status(200).send(employee) : res.status(404).send({ message: 'Employee not found' })
}

const employeePatchOne = async (req, res) => {
    const data = req.body
    const { id } = req.params
    const employee = await Employee.findByPk(id)
    employee.set(data)
    await employee.save()
    res.send(employee)
}

const employeeDeleteOne = async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findByPk(id)
    await employee.destroy()
    res.send(employee)
}

export { employeeDeleteOne, employeeGetAll, employeeGetOne, employeePatchOne }