var Post = mongoose.model('Post', {
  poster: {
    type: Object,
  },
  content: {
    type: String,
  },
  [likes: {
  }],
  [comments: {
  }],
  createdAt: {
    type: Date
  }
})

module.exports = {
  Token: Token
}
