'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavSchema extends Schema {
  up () {
    this.create('favs', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('post_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('favs')
  }
}

module.exports = FavSchema
