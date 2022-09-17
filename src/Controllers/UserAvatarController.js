const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarControler {
    async update(request, response) {
        const { user_id } = request.user.id

        const diskStorage = new DiskStorage()
        
        const avatarFileName = request.file.filename

        const user = await knex('user')
        .where({ id: user_id }).first()

        if(!user){
            throw new AppError(`User does not exist:`, 401)
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFIle(avatarFileName)
        user.avatar = filename

        await knex('users').update(user).where({id: user_id })

        return response.json(user)
    }
}

module.exports = UserAvatarControler