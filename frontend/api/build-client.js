import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // Run on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // Run on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
