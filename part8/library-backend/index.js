const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')
const book = require('./models/book')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!
    id: ID!,
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!,
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author!]!,
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!,
    ): Book

    addAuthor(
      name: String!,
      born: Int!
    ): Author
    
    editAuthor(
      name: String!,
      born: Int!,
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, {author, genre}) => {
      const authorId = await Author.findOne({ name: author })._id
      return Book.find({
        ...(authorId && { author: authorId }),
        ...(genre && { genres: genre })
      }).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => Book.collection.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: author._id })
      const savedBook = await book.save()
      return Book.findById(savedBook._id).populate('author')
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      return author.save()
    },
    editAuthor: async (root, { name, born }) => {
      const author = await Author.findOne({ name: name })
      author.born = born
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})