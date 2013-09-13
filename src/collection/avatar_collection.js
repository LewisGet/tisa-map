define([
	
	'jquery',
	'underscore',
	'backbone',
	'collection/firebase_db',
	'model/avatar_model',
	'avatars',
	'firebase',
	'firebase_login'

	], function($, _, Backbone, firebaseCollection, AvatarModel) {

		var avatarCollection = Backbone.Collection.extend({

			model: AvatarModel,

			allowPic: function () {
				console.log(this.model);
				// console.log('allowPic');
				// var client = new AvatarsIO('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2YXRlX3Rva2VuIjoiZjlmMGVmNjgxOWRjNjQ2ODM2ZGQxNzgzZWJhNmJhZTBkOGRkN2ZmMDI4MjkwZGM1NDEyN2ZmNGQ2ODQzMWFjNiJ9.IULO-Hzyzmrns41MV9EDf_mTuzQIx0qSYzDzk62l6zM'); // obtain at http://avatars.io/
				// var uploader = client.create('#avatar'); // selector for input[type="file"] field, here #avatar, for example
				// this.client = client;
				// this.uploader = uploader;
				// this.uploader.setAllowedExtensions(['png', 'jpg']); // optional, defaults to png, gif, jpg, jpeg
				// return this.startLoad();
			},

			startLoad: function () {
				this.uploader.on('start', function(){
					console.log('start uploading');
					// fires when new avatar starts uploading
					$('#upload_process').html('<img src="/img/ajax-loader.gif"/>')
				});
				return this.completeLoad();
			},

			completeLoad: function () {
				this.uploader.on('complete', function(url){
					$('#upload_process').html('<img src="' + url + '?size=medium" width="150px"/>感謝你的參與！！')
					
					var upload_img_db = new FirebaseSimpleLogin(tisadb, function(error, user){
						if (error) {
							// an error occurred while attempting login
							console.log(error);
						} else if (user) {
							// user authenticated with Firebase
							var uploadRef = tisadb.child('users').child(user.id + '(' +  user.provider + ')');
							uploadRef.update({upload_img: url + '?size=large'})
						}
					})
					$('#avatar').hide();
				});
			}

		});

		return avatarCollection;

	})