export const initFacebookSDK = () => {
  // Load the Facebook SDK asynchronously
  window.fbAsyncInit = () => {
    FB.init({
      appId: "7670793376312814",
      xfbml: true,
      version: "v19.0",
    });
  };
};

export const facebookLogin = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: "7670793376312814",
      xfbml: true,
      version: "v19.0",
    });
    FB.login((response) => {
      if (response.authResponse) {
        console.log("Welcome!  Fetching your information.... ");
        FB.api("/me", { fields: "name, email" }, (response) => {
          document.getElementById("profile").innerHTML =
            "Good to see you, " +
            response.name +
            ". i see your email address is " +
            response.email;
        });
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  };
};
