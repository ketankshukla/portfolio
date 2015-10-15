---
layout: post
title: Blocitoff
thumbnail-path: "img/blocitoff.png"
short-description: A utility application with Rake Automation and a self-destructing to-do list application.

---

{:.center}
![]({{ site.baseurl }}/img/blocitoff.png)

## Summary

Blocitoff is a utility application with Rake Automation and a self-destructing to-do list application.

## Explanation

To-o lists are notorious for collecting junk: to-do items that you want to remember, but are not very important and thus get consistently put-off. To address the problem of to-do list clutter, I created Blocitoff.

## Problem

Blocitoff aims to keep to-do lists manageable by automatically deleting to-do items that have not been completed after seven days. The hypothesis is that if the to-do item is not important enough to be completed in seven days, it doesn't belong on your to-do list.

## Solution

### Use Cases

* As a user, I want to sign up for a free account by providing a user name, password and email.
* As a user, I want to sign in and out of Blocitoff.
* As a user, I want to see my profile page.
* As a user, I want to create multiple to-do items.
* As a developer, I want to seed the development database automatically with users and to-do items.
* As a user, I want to mark to-do items as complete and have them deleted.
* As a user, I want to see how old a to-do item is.
* As a user, my to-dos should be automatically deleted seven days after their creation date.

#### User Sign Up

As a user, I want to sign up for a free account by providing a user name, password and email.

I used the Devise gem for authentication. Blocitoff's authentication system allows users to sign up and send emails for account confirmation.
Once the user clicks on the confirmation link in their email, they are re-directed to the sign-in page on the Blocitoff site.

The following tests were created to ensure a successful sign-in:

* Sign a new user up. Ensure that a confirmation email is sent out by Blocitoff and received by the user.
* Ensure that invalid emails are handled appropriately with error messages.
* Ensure that the system does not accept duplicate emails.

#### User Sign In and out

As a user, I want to sign in and out of Blocitoff

The following tests were created to ensure that a user is able to successfully sign in and out.

* Sign into Blocitoff and make sure the top navigation changes to indicate that the user is signed in.
* Sign out of Blocitoff and make sure the top navigation changes to indicate that the user is signed out.
* If the user requests to change the password, make sure the system successfully sends him a reset password email and when the user clicks on the link inside the email, make sure the user is re-directed to the change password page.

#### User Profile Page

As a user, I want to see my profile page

For this, I generated a UsersController controller with the show action. I wrote the required code in the show action to populate users show view.
Necessary code was also written in the users show view to display the information of the signed-in user.
After a user signs in, they are redirected to their users show view.
The root path in the routes file was updated so that it is mapped to the users show view.

The following tests were created to ensure that a user profile was successfully loaded

* User signs into Blocitoff and is redirected to their profile page through the show action.
* Make sure that the user's profile page has the appropriate user details.

#### Create To-Do items

As a user, I want to create multiple to-do items

I created a Todo model that is connected to a user.
The relationship between a user and a Todo item is as follows:
A user can have many Todo items
A Todo item can only belong to one user.

I updated the user.rb and item.rb files to reflect this association.
Next, I nested the Todo items resource under resources :users in routes.rb.

Users may only create items for now, so I generated the Todos controller file  with the action that created a new item associated with the user.
I then modified the UsersController to provide the requisite instance variable to users#show.

Next, I created an Todos _form.html.erb partial in a new Todos view directory so users can submit new items. I created a partial named _item.html.erb in the items directory. I used it in the users show view to show the body of each item already associated with the user.

The form partial above rendered the form for submitting a new item, but this item partial rendered the relevant information for an item associated with a user.

This partial renders a single item, therefore I called it multiple times, rendering a partial for each item in the Todo items. This is a good candidate for an each loop.

The following tests were created to ensure that Todo items were successfully created.

* Ensure creation of multiple to-do items by each user.
* Ensure that the Todo items are listed after creation.

#### Seeding data

As a developer, I want to seed the development database automatically with users and to-do items

I used the Faker gem to generate fake data for users and items for testing.

The following tests were created to make sure that the seeded data was populated

* Ensure to rebuild the database and seed it with the data that is specified in the seeds.rb file.

#### Mark Todo items as complete

As a user, I want to mark to-do items as complete and have them deleted

When a user marked a to-do item as complete, I deleted it immediately by using a :delete link to "complete" a to-do item by adding the following code

<%= link_to "", item, method: :delete, class: 'glyphicon glyphicon-ok' %>

The glyphicon glyphicon-ok classes created a check mark which linked to the delete action.

I conducted tests to make sure that I could mark a to-do item as complete and was able to delete it. I used Ajax to delete to-do items without reloading the page.

The following tests were conducted to ensure successful deletion of completed items.

* Ensure that I am able to delete multiple to-do items.
* Ensure that I can delete to-do items using Ajax.

#### Display Time Remaining

As a user, I want to see how old a to-do item is.

According to the specs, users have seven days to complete a to-do item before it is automatically deleted. I used the "distance_of_time_in_words" helper method to display the number of days since a to-do item was created.

Here's how I tested the code.

I used the Rails console and the update_attribute method to update the created_at attribute on several to-do items. My views correctly displayed the number of days left to complete these to-do items.

#### Delete expired Todo items

As a user, my to-dos should be automatically deleted seven days after their creation date

Rake is a utility that can be used to automate administrative tasks in a Rails application.
I incorporated this utility to automate a rake task within the application where Todo lists that hit the expiry date are automatically deleted.

Here's how I tested the code.

I generated todos and set their creation dates to a time in the past, then execute my Rake task. I then verified that todos older than seven days are deleted, while all others remained.

## Results

The results were verified through testing each user case.
The final result is a [demo](http://ketan-blockitoff.herokuapp.com/) site.

## Conclusion

The app works as ordered!
