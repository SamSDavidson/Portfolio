const request = require('supertest');
const app = require('../app');

describe('user functionality', () => {
  it('fetch user', async () => {
    const res = await request(app)
      .get('/users/2a933b6e-ced6-40bb-82de-1ac536d55c80')
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty(username);
    expect(res.body).toHaveProperty(id);
    expect(res.body).toHaveProperty(city);
    expect(res.body).toHaveProperty(state);
    expect(res.body).toHaveProperty(avatar);
  })

  it('add to watched', async () => {
    const res = await request(app)
      .put('/users/')
      .send({
        tagId: '2a933b6e-ced6-40bb-82de-1ac536d55c83',
      })
    expect(res.statusCode).toEqual(201);
  })

  it('get watching', async () => {
    const res = await request(app)
      .get('/users/')
      .send({
        id: '2a933b6e-ced6-40bb-82de-1ac536d55c80'
      })
    expect(res.body).toHaveProperty(watched);
  })
},

  describe('post functionality', () => {
    it('add comment', async () => {
      const res = await request(app)
        .post('/posts')
        .send({
          postId: '2a933b6e-ced6-40bb-82de-1ac536d55c83',
          text: 'Hello World'
        })
      expect(res.statusCode).toEqual(201);
    })
    it('add vote', async () => {
      const res = await request(app)
        .put('/posts')
        .send({
          postId: '2a933b6e-ced6-40bb-82de-1ac536d55c83',
          direction: 1
        })
      expect(res.statusCode).toEqual(201);
    })
    it('get post', async () => {
      const res = await request(app)
        .get('/posts')
        .send({
          postId: '2a933b6e-ced6-40bb-82de-1ac536d55c83'
        })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(content);
      expect(res.body).toHaveProperty(title);
      expect(res.body).toHaveProperty(comments);
      expect(res.body).toHaveProperty(votes);
      expect(res.body).toHaveProperty(userId);
    })
    it('get posts', async () => {
      const res = await request(app)
        .get('/posts')
      expect(res.body).toHaveProperty(tag);
      expect(res.body).toHaveProperty(type);
    })
    it('get user posts', async () => {
      const res = await request(app)
        .get('/posts')
        .send({
          userId: '2a933b6e-ced6-40bb-82de-1ac536d55c80'
        })
      expect(res.body).toHaveProperty(userId);
      expect(res.body).toHaveProperty(content);
      expect(res.body).toHaveProperty(title);
      expect(res.body).toHaveProperty(comments);
      expect(res.body).toHaveProperty(votes);
    })
  })
)