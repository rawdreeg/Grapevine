'use strict'

const Post = use('App/Models/Post')
const Reply = use('App/Models/Reply')

class PostController {
    async post ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // Save Post to database
        const post = await Post.create({
            user_id: user.id,
            post: request.input('post')
        })
    
        // fetch Post's relations
        await post.loadMany(['user', 'favs', 'replies'])
    
        return response.json({
            status: 'success',
            message: 'Post created!',
            data: post
        })
    }

    async show ({ params, response }) {
        try {
            const post = await Post.query()
                .where('id', params.id)
                .with('user')
                .with('replies')
                .with('replies.user')
                .with('favs')
                .firstOrFail()
    
            return response.json({
                status: 'success',
                data: post
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Post not found'
            })
        }
    }

    async reply ({ request, auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get post with the specified ID
        const post = await Post.find(params.id)
    
        // persist to database
        const reply = await Reply.create({
            user_id: user.id,
            post_id: post.id,
            reply: request.input('reply')
        })
    
        // fetch user that made the reply
        await reply.load('user')
    
        return response.json({
            status: 'success',
            message: 'Reply posted!',
            data: reply
        })
    }

    async destroy ({ auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get post with the specified ID
        const post = await Post.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()
    
        await post.delete()
    
        return response.json({
            status: 'success',
            message: 'Post deleted!',
            data: null
        })
    }
}

module.exports = PostController
