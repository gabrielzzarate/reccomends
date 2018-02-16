const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// getting our model out of mongooose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id); // id is automatically generated by mongo
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// new GoogleStrategy creates new instance of the GoogleStrategy, inside the constructor, pass in
// configuration for the app
// passport.use is a generic register telling passport what strategy to use
// callbackURL:

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			// initiate query to prevent duplicate user records
			const existingUser = await User.findOne({ googleId: profile.id });
				
			if (existingUser) {
				// we already have a record with the given profileId
				done(null, existingUser);
			} else {
				// we don't have a user record with this iD, make a new record
				const user = await new User({ googleId: profile.id }).save();
				done(null, user); // the user we get back from the db, we make use of this one instead of the initial user
			}
		}
	)
);


// write a function to retrieve a blog of json
// make an ajax request! Use the 'fetch' function

// function fetchAlbums(){
// 	fetch('https://rallycoding.herokuapp.com/api/music-albums')
// 		.then(res => res.json())
// 		.then(json => console.log(json));
// }






/* returns 
	accessToken -> allows us to reach back over to google and proves that we are allowed to use the profiles info
	refreshToken -> the accessToken automatically expires over time. the refreshToken allows us to refresh that accessToken
	profile -> the information that we will use in our application
*/
