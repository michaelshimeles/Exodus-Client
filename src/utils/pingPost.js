import axios from "axios";
const pingPost = (URL, body, setResult, freq) => {
  if (!freq) {
    axios
      .post(URL, body)
      .then((response) => {
        console.log(response.data)
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      }); 
    return;
  }

  setInterval(() => {
    axios
      .post(URL, body)
      .then((response) => {
        console.log(response.data)
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, freq);
};

export default pingPost;
