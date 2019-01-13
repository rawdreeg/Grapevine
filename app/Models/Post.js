'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    replies() {
        return this.hasMany('App/Models/Reply')
    }

    favs() {
        return this.hasMany('App/Models/Fav')
    }
}

module.exports = Post
