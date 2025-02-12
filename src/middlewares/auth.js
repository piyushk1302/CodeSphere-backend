const adminAuth = (req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "sdf";
  const isAuthorized = token === "sdf";
  if (!isAuthorized) {
    res.status(401).send("The user is not authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth is getting checked");
  const token = "sdf";
  const isAuthorized = token === "sdfbhbh";
  if (!isAuthorized) {
    res.status(401).send("The user is not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,userAuth,
};
