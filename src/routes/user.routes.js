const  { Router } = require('express')

const UsersController = require('../Controllers/UsersController')

const usersRouter = Router()

const userController = new UsersController();

usersRouter.post('/', userController.create)
usersRouter.put('/:id', userController.update)

module.exports = usersRouter