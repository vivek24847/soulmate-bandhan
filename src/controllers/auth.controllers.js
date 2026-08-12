const register = async (req, res) => {
  try {
      console.log(req.body, "req")
  } catch (error) {
   console.log("error" , error)
  }
};

export { register };
