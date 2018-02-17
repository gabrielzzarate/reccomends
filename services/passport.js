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
			const existingUser = await User.findOne({
				googleId: profile.id
			});
			console.log(profile);
			if (existingUser) {
				// we already have a record with the given profileId
				done(null, existingUser);
			} else {
				// we don't have a user record with this iD, make a new record
				const user = await new User({
					googleId: profile.id,
					name: profile.displayName,
					image: profile.photos[0].value
				}).save();
				done(null, user); // the user we get back from the db, we make use of this one instead of the initial user
			}
		}
	)
);
