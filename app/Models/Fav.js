'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Fav extends Model {
    post () {
        return this.belongsTo('App/Models/Post')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Fav
