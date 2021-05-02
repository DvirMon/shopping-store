const config = {
  port: 3000,
  production: false,
  mongodb: {
    URI: "mongodb+srv://dom:mongo3000@shopping-store-yfdwj.mongodb.net/Grocery",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  },
  session: {
    secret: "wexO23UXGezfTKHc",
    resave: true,
    saveUninitialized: false,
    // cookie: { secure: false },
  },
}


module.exports = config