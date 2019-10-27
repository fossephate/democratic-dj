let SpotifyWebApi = require("spotify-web-api-node");
let spotifyApi = new SpotifyWebApi({
	clientId: "9c4e8aa5d56847059632fb4d8323ccd7",
	clientSecret: "9f2ddb790efa4402997be72366ef6c7f",
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
	(data) => {
		console.log("The access token expires in " + data.body["expires_in"]);
		console.log("The access token is " + data.body["access_token"]);

		// Save the access token so that it's used in future calls
		spotifyApi.setAccessToken(data.body["access_token"]);
	},
	(error) => {
		console.log("Something went wrong when retrieving an access token", error.message);
	},
);
