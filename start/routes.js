'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//auth routes
Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')

Route.group(() => {
  Route.get('/me', 'UserController.me')
  Route.put('/update_profile', 'UserController.updateProfile')
  Route.put('/change_password', 'UserController.changePassword')
})
  .prefix('account')
  .middleware(['auth:jwt'])

// profile
Route.get(':username', 'UserController.showProfile')

// follow

Route.group(() => {
  Route.get('/users_to_follow', 'UserController.usersToFollow');
  Route.post('/follow', 'UserController.follow')
  Route.delete('/unfollow/:id', 'UserController.unfollow')
  Route.get('/timeline', 'UserController.timeline')
})
  .prefix('users')
  .middleware(['auth:jwt'])

//posts
Route.post('/post', 'PostController.post').middleware(['auth:jwt'])
Route.get('/posts/:id', 'PostController.show')
Route.post('/posts/reply/:id', 'PostController.reply').middleware(['auth:jwt']);
Route.delete('/posts/destroy/:id', 'PostController.destroy').middleware(['auth:jwt'])


//Faving posts
Route.group(() => {
  Route.post('/create', 'FavController.fav')
  Route.delete('/destroy/:id', 'FavController.unfav')
})
  .prefix('favs')
  .middleware(['auth:jwt'])


