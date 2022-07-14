const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('a valid username and password can created a user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if no username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      password: 'qwer1234'
    }

    const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    
    expect(result.body.error).toContain('username and password are required')
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if no password', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'neil2'
    }

    const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    
    expect(result.body.error).toContain('username and password are required')
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username length less than 3', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ne',
      password: '112222'
    }

    const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    
    expect(result.body.error).toContain('username and password must be at least 3 length')
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password length less than 3', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'neil2',
      password: '11'
    }

    const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    
    expect(result.body.error).toContain('username and password must be at least 3 length')
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})