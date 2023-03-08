const axios = require("axios");

axios
  .patch("https://mobile-tech-challenge-api.vercel.app/api/countries/1", {
    isBucketList: true,
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
