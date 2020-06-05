const pagination = (request, response, next) => {
  const myCustomLabels = {
    limit: "pageSize",
    page: "pageIndex",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    totalDocs: "length",
  };

  const options = {
    page: request.params.page,
    limit: request.params.limit,
    customLabels: myCustomLabels,
    collation: {
      locale: "en",
    },
  };

  request.options = options;

  next();
};



module.exports = pagination;
