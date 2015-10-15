---
layout: post
title: BlocMarks
thumbnail-path: "img/blocflix.png"
short-description: Social Bookmarking Site With Email Integration. A production quality social bookmarking app that allows users to email, manage and share bookmarked URLs.

---

{:.center}
![]({{ site.baseurl }}/img/blocflix.png)

## Summary

Blocmarks is a Social Bookmarking Site With Email Integration. A production quality social bookmarking app that allows users to email, manage and share bookmarked URLs.

Blocmarks an application that allows a user to bookmark URLs via email, peruse other user's bookmarks and maintain a personal index of categorized bookmarks.

## Explanation

It is easy enough to bookmark a URL in your browser, but eventually your bookmark library may get cluttered and it may require effort to manage bookmarks. It would be nice to have the ability to share bookmarks with friends. That is not something you can do easily from your native browser.

Blocmarks will solve these problems by organizing bookmarks by topic and making them public so that other users can find them and add bookmarks to their own Blocmarks profile.

## Solution

### Use Cases

* As a user, I want to sign up for a free account by providing a user name, password and email.
* As a user, I want to sign in and out of Blocmarks.
* As a user, I want to email a URL to Blocmarks and have it saved in the Blocmarks database.
* As a user, I want to see an index of all topics and their bookmarks.
* As a user, I want to create, read, update, and delete bookmarks.
* As a user, I want to be the only one allowed to delete and update my bookmarks.
* As a user, I want to "like and unlike" bookmarks created by other users.
* As a user, I want to see a list of bookmarks on my personal profile that I've added or liked.

#### User Sign Up

As a user, I want to sign up for a free account by providing a user name, password and email.

I used the Devise gem for authentication. BlocMarks' authentication system allows users to sign up and send emails for account confirmation.
Once the user clicks on the confirmation link in their email, they are re-directed to the sign-in page on the BlocMarks site.

The following tests were created to ensure a successful sign-in:

* Sign a new user up. Ensure that a confirmation email is sent out by BlocMarks and received by the user.
* Ensure that invalid emails are handled appropriately with error messages.
* Ensure that the system does not accept duplicate emails.

#### User Sign In and out

As a user, I want to sign in and out of BlocMarks

The following tests were created to ensure that a user is able to successfully sign in and out.

* Sign into BlocMarks and make sure the top navigation changes to indicate that the user is signed in.
* Sign out of BlocMarks and make sure the top navigation changes to indicate that the user is signed out.
* If the user requests to change the password, make sure the system successfully sends him a reset password email and when the user clicks on the link inside the email, make sure the user is re-directed to the change password page.

#### Receive Incoming emails

As a user, I want to email a URL to Blocmarks and have it saved in the Blocmarks database.

The first thing I did was generate a topic model where the topics should be associated with users.

I then created the association between users and topics; whereby, each user has many topics and each topic belongs to a single user.

I then generated a bookmark model and associated the bookmarks with the topics.
The relationship now is that each topic belongs to a user and both the user and topic have many bookmarks.
The routes.rb file was updated accordingly to reflect this nested solution.

Mailgun, the email service for developers, was then used to configure Blocmarks to receive an email containing a bookmark URL. Incoming emails were parsed and converted into bookmark objects that belonged to a topic.

With Mailgun configured and models created, code was added to the create action in IncomingController to process incoming emails and turn them into bookmarks.

The following is how the code was tested.

* An email was sent to the app and thereafter it was verified that a bookmark was created.
* An email was sent to the app from an account that did not exist in the application's database as a user. As a result, a new account was created with that email address and a default password was set as well as the bookmark was also created for that user.
* An email was sent to the app using a topic that did not exist. As a result, a new topic was created for that particular user along with it's bookmark.

#### List of Topics and bookmarks

As a user, I want to see an index of all topics and their bookmarks

To accomplish this, I created a Topics controller with the CRUD actions index show new and edit.

I then displayed each topic and the bookmarks that belonged to it.

I set it up so that the app allowed users to create and destroy topics from the topics index view.
Clicking on a topic took the user to that topic's show view and displayed only those bookmarks which belonged to it.

Finally I implemented the show action in the topics controller and displayed the bookmarks.

Here's how I tested the listing of topics and bookmarks.

* Ensured that I was able to create a topic.
* Ensured that I was able to delete a topic.
* Ensured that associated bookmarks were displayed for each topic.

#### Generate a Bookmarks CRUD

As a user, I want to create, read, update, and delete bookmarks

I created the Bookmarks controller without an index action for it because the topics show view fulfills this need. I then nested the bookmarks resource under the topics resources in routes.rb. ensuring that I only created the routes that the application needed.

Finally I allowed the users to create, destroy and update bookmarks.

Here are the tests I conducted.

* Ensure that I am able to create new bookmarks.
* Ensure that I am able to update bookmarks.
* Ensure that I am able to delete bookmarks.

#### User Authorization

As a user, I want to be the only one allowed to delete and update my bookmarks

I used the Pundit gem for authorization.

Next I generated a default policy for the application that will determine what the user is authorized to do.
I then defined the rules for the create, update, and destroy resource actions.

Finally, I created a policy file for bookmarks. The application policy defaults worked for bookmarks, so the file can be empty apart from the class definition and inheritance declaration. I added authorization to Bookmarks controller and the bookmark and topic views.

Here's how I tested the code.

* Ensured that I was NOT able to update and/or delete bookmarks created by another user.
* Ensured that I was able to update and/or delete bookmarks that I created.

#### Like and Unlike Bookmarks

As a user, I want to "like and unlike" bookmarks created by other users

"Liked" flags need to be associated with the user who flagged the bookmark as "liked", and the bookmark that was flagged as a "like". This functionality merits a separate model. I created a Like model with bookmark and user references - no other attributes were necessary - and migrated the changes.

The likes table did not have any special data of its own (just its associations), so it was considered a simple join table. A join table represents a relationship between two objects - in this case, a user and a bookmark.

I associated likes by adding has_many to user.rb and bookmark.rb. An instance of the Like model cannot exist without an associated user or bookmark, so I added the dependent: :destroy option for both models.

The UI implementation for likes had to be simple. I wanted to display a link next to each bookmark so that the user could "like" that bookmark. I also displayed a link for users to "unlike" a bookmark. To toggle between liked and un-liked states, I created a liked method which let me know if a given user has liked a bookmark. I created the method in the user model.

Before I added the link to the view, I created a controller for likes.

No views were specified - that is because this controller won't have any normal views. Instead, just the create and destroy actions were defined, which aren't associated with GET requests, and therefore have no views. The required routes for create and destroy were added to routes.rb.

Now that I have a method for detecting whether a user has liked a post, a Likes controller, and the required routes, I built a link for liking a bookmark. I created a _like.html.erb partial in the app/views/likes/ directory.

I then rendered the partial and added create and destroy methods to the Likes controller.

Next, I created a policy file for likes. The application policy defaults will work for likes, so bookmarks policy can be empty apart from the class definition and inheritance declaration.

I added the authorization to the Likes controller then added authorize like before the if statements in the create and destroy methods.

Finally, I added the proper authorization to the partial.

Here's how I tested the code:

* Ensure that I am able to like bookmarks created by other users.
* Ensure that I am able to like bookmarks created by myself.
* Ensure that I am able to unlike a previously liked bookmark and vice versa.

#### User Profiles

As a user, I want to see a list of bookmarks on my personal profile that I've added or liked

To accomplish this, I generated a Users controller with the show action and added the necessary routes to config/routes.rb.

Then I populated the show action instance variables with the bookmarks the user has created and liked.

I then modified the users show method to display the bookmarks the user has added and liked.

Finally, in the _like partial page, I gave users the ability to unlike bookmarks on their profile page.

Here's how I tested the code.

* Ensure that the user profile displays all bookmarks a user has created or liked.
* Ensure that a user is able to unlike a liked bookmark from their profile page.

## Results

The results were verified through testing each user case.
The final result is a [demo](https://ketan-blocmarks.herokuapp.com/) site.

## Conclusion

The app works as ordered!
