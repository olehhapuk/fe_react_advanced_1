# Express Blog

## Teams

### Team 1

- Луцький Макар - Teamlead
- Кравченко Артем
- Михайло Ладик
- Чудаков Олександр

### Team 2

- Шевчук Владислав - Teamlead
- Гудзь Ваня
- Лисюк Максим
- Олійник Дмитро

## Routes

### Authorization

- POST /auth/register - Register new user
  username: {
  type: String,
  minlength: 2,
  required: true,
  unique: true,
  }
  password: {
  type: String,
  minlength: 6,
  required: true,
  }
  firstName: {
  type: String,
  minlength: 2,
  required: true,
  }
  lastName: {
  type: String,
  minlength: 2,
  required: true,
  }
  location: {
  type: String,
  required: false,
  }
  avatarUrl: {
  type: String,
  required: false,
  default: 404-img.jpg
  }
  githubUrl: {
  type: String,
  required: false,
  }
  description: {
  type: String,
  required: false,
  minlength: 3
  }
  work: {
  type: String,
  required: false,
  minlength: 3
  }
  hobby: {
  type: String,
  required: false,
  minlength: 3
  }
  birthDate: {
  type: Date,
  required: false,
  }
- POST /auth/login - Login existing user with username and password
  username: {
  type: String,
  minlength: 2,
  required: true,
  }
  password: {
  type: String,
  minlength: 6,
  required: true,
  }
- GET /auth/me - Check token and return user data

### Users

- POST /users/:userId/follow - Follow or unfollow user
- GET /users/:userId - Get user data
- PUT /users/:userId - Updated authorized user profile
  username: {
  type: String,
  minlength: 2,
  required: true,
  unique: true,
  }
  password: {
  type: String,
  minlength: 6,
  required: true,
  }
  firstName: {
  type: String,
  minlength: 2,
  required: true,
  }
  lastName: {
  type: String,
  minlength: 2,
  required: true,
  }
  location: {
  type: String,
  required: false,
  }
  avatarUrl: {
  type: String,
  required: false,
  default: 404-img.jpg
  }
  githubUrl: {
  type: String,
  required: false,
  }
  description: {
  type: String,
  required: false,
  minlength: 3
  }
  work: {
  type: String,
  required: false,
  minlength: 3
  }
  hobby: {
  type: String,
  required: false,
  minlength: 3
  }
  birthDate: {
  type: Date,
  required: false,
  }
- DELETE /users/:userId - Delete authorized user profile

### Posts

- GET /posts - Get all posts with sorting(likes, views, createdAt), filtering, pagination
- GET /posts/:postId - Get post data with comments
- POST /posts - Create post
  thumbnailUrl: {
  type: String,
  required: false,
  }
  title: {
  type: String,
  required: true,
  minlength: 3
  }
  body: {
  type: String,
  required: true,
  minlength: 10
  }
  tags: {
  type: String,
  required: false
  }
- PUT /posts/:postId - Edit post
  thumbnailUrl: {
  type: String,
  required: false,
  }
  title: {
  type: String,
  required: true,
  minlength: 3
  }
  body: {
  type: String,
  required: true,
  minlength: 10
  }
  tags: {
  type: String,
  required: false
  }
- DELETE /posts/:postId - Delete post
- PATCH /posts/:postId/like - Like post
- PATCH /posts/:postId/save - Add post to reading list

### Tags

- GET /tags - Get all tags with search filter

### Comments

- POST /comments - Create new comment for specified post
  text: {
  type: String,
  required: true,
  minlength: 2,
  }
  parentPost: {
  type: String(id),
  required: true,
  }
  parentComment: {
  type: String(id),
  required: false
  }
- PUT /comments/:commentId - Edit existing comment by it's author
  text: {
  type: String,
  required: true,
  minlength: 2,
  }
  parentComment: {
  type: String(id),
  required: false
  }
- PATCH /comments/:commentId/like - Like existing comment
- DELETE /comments/:commentId - Delete existing comment

## Models

[DB Schema Design](https://lucid.app/lucidchart/50c69055-66e7-482c-9576-3c2c8baab6bc/edit?viewport_loc=-255%2C-7%2C2123%2C1123%2C0_0&invitationId=inv_5211d781-e4bb-404a-b36b-7f9a097e76f6)

## Packages

- nodemon
- express
- cors
- helmet
- mongoose
- dotenv
- yup
- volleyball
- passport
- passport-jwt
- bcryptjs
- jsonwebtoken
