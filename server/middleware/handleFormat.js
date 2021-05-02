const formatPhone = async (request, response, next) => {

  const payload = request.body

  if (payload.type == "phone" && payload.contact.startsWith("0")) {

    const str = payload.contact.substring(1)

    console.log(str)

  }


  next()

}

module.exports = formatPhone