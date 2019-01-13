'use strict'
const Fav = use('App/Models/Fav')


class FavController {
    async fav ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        const postId = request.input('post_id')
    
        const fav = await Fav.findOrCreate(
            { user_id: user.id, post_id: postId },
            { user_id: user.id, post_id: postId }
        )
    
        return response.json({
            status: 'success',
            data: fav
        })
    }

    async unfav ({ params, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // fetch fav
        await Fav.query()
            .where('user_id', user.id)
            .where('post_id', params.id)
            .delete()
    
        return response.json({
            status: 'success',
            data: null
        })
    }
    
}

module.exports = FavController
