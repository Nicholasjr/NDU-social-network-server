const Conversation = require('../models/Conversation')
const { CustomError } = require('../utils')
const CRUD = require('./crud')

class ConversationService extends CRUD {
    async getAll(userId) {
        const data = await this.Model.find({ members: { $in: userId } }).lean()
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }
}

module.exports = new ConversationService(Conversation, 'Conversation')
