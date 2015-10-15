---
layout: post
title: BlocMetrics
thumbnail-path: "img/blocipedia.png"
short-description: API Tracking Service and Reporting Tool. An analytics service and reporting tool that you can use with web apps to track user activity and report results.

---

{:.center}
![]({{ site.baseurl }}/img/blocipedia.png)

## Summary

Blocmetrics is an API Tracking Service and Reporting Tool. An analytics service and reporting tool that you can use with web apps to track user activity and report results.

## Explanation

There are plenty of good analytic services, but that doesn't mean we can't build a better one.
Our analytics service will offer a few key features:

* A client-side JavaScript snippet that allows a user to track events on their website.
* A server-side API that captures and saves those events to a database.
* A Rails application that displays the captured event data for a user.

## Solution

### Use Cases

* As a user, I want to sign up for a free account by providing a name, password, and email.
* As a user, I want to sign in and out of Blocmetrics.
* As a user, I want to register an application with Blocmetrics for tracking.
* As a user, I want events associated with registered applications.
* As a developer, I want to receive incoming events in an API controller.
* As a user, I want to use JavaScript to capture client-side events in my application.
* As a user, I want to see a graph of events for each registered application.

#### User Sign Up

As a user, I want to sign up for a free account by providing a user name, password and email.

I used the Devise gem for authentication. Blocmetrics' authentication system allows users to sign up and send emails for account confirmation.
Once the user clicks on the confirmation link in their email, they are re-directed to the sign-in page on the Blocmetrics site.

The following tests were created to ensure a successful sign-in:

* Sign a new user up. Ensure that a confirmation email is sent out by Blocmetrics and received by the user.
* Ensure that invalid emails are handled appropriately with error messages.
* Ensure that the system does not accept duplicate emails.

#### User Sign In and out

As a user, I want to sign in and out of Blocmetrics

The following tests were created to ensure that a user is able to successfully sign in and out.

* Sign into Blocmetrics and make sure the top navigation changes to indicate that the user is signed in.
* Sign out of Blocmetrics and make sure the top navigation changes to indicate that the user is signed out.
* If the user requests to change the password, make sure the system successfully sends him a reset password email and when the user clicks on the link inside the email, make sure the user is re-directed to the change password page.

#### Register An application

As a user, I want to register an application with Blocmetrics for tracking

Blocmetrics must track events from multiple applications. As such, I registered applications with a unique attribute so that when Blocmetrics receives an event, it knows which application to associate the event.

Thankfully, each application already has a unique attribute: its URL.

Next I generated an application model. When a user registers a new application, I saved that registration and associated it with the user. I then generated a registered application model that is associated with the user. The model had a name and URL attribute.

With the registration model created, I generated a Registered Applications Controller with the appropriate CRUD actions.

Finally I built the views. A user should see an index of all their registered applications. I completed the index action and views and filled out the create action and views. The create action and views created a new registration associated with a user.

I built out the read action and views as well. The read view displayed the registered application's name and URL. Lastly, I constructed the delete action to de-register and destroy an existing application registration.

Here is how I tested my code.

* Ensure that I am able to register multiple applications.
* Ensure that the registered applications are displayed after creation.
* Ensure that I am able to re-register an application.
* Ensure that I am able to view an index of registered applications.

#### Associate events

As a user, I want events associated with registered applications

Now that Blocmetrics can register applications to track, it needs to be able to store events that it will receive from those applications.

First I generated an Event model. When Blocmetrics receives an event, it should store the name of the event. I generated an event model that is associated with a registered application with an event name attribute.

Next, I seeded the database. I used the seeds.rb file to populate Blocmetrics with some registered applications and associated events. I varied the names of events using the Faker gem so as to simulate a variety of tracked events.


Finally, I modified the application show page. On the registered application show page, Blocmetrics will eventually display graphs of the different events. The name and count of each type of event associated with the application are displayed.
Ruby's group_by method method was used to sort events by name.

Here's how I tested the app.

* Ensure that the applications and events are seeded into the development database.
* Ensure that the registered application's show page displays the count of the associated events.

#### API Controller

As a developer, I want to receive incoming events in an API controller

To give Blocmetrics the ability to receive incoming events from registered applications, it will need an API controller and routes.

First I edited routes.rb to provide the requisite API routes.

Next, I created an Events Controller to match the API route. I made a new directory in app/controllers named api. Within that directory, I created the new controller.

I then created a new event associated with the registered_application.

Our client-side JavaScript code will need to send an AJAX request to the Blocmetrics API so that we can store events. Browsers normally do not allow such cross-origin requests to occur. This is to prevent security vulnerabilities such as cross-site scripting. Various hacks exist to work around this problem, but there is a well-supported standard called cross-origin resource sharing (CORS). CORS allows us to allow cross-origin requests in a controlled manner without opening up security vulnerabilities. We implemented CORS in EventsController.

CORS works by making a preliminary request to the target server, asking if the cross-domain request will be permitted. This uses the HTTP OPTION verb, which is not part of Rails' restful routes. An OPTION request precedes a GET or POST request and checks whether the route accepts a cross-origin request. It was added to the routes file manually.

We must set CORS response headers so our controller actions will allow POST requests across domains.

Here's how the app was tested.

* See if a request was successfully received using this command:
url -v -H "Accept: application/json" -H "Origin: http://registered_application.com" -H "Content-Type: application/json" -X POST -d '{"name":"foobar"}'  http://localhost:3000/api/events
* Confirmd that a new event was created with the event name "foobar" and successfully associated with the registered application.
Sent another curl request, this time from an unregistered URL. Confirmed that a new event is not created.

#### Client-side JavaScript

As a user, I want to use JavaScript to capture client-side events in my application

Blocmetrics users must be able to track events using JavaScript snippets. There's only one function your snippet needs to support: blocmetrics.report();

When a browser executes the blocmetrics.report function, it makes an Ajax request to the server-side API to create the event on your server.

In order to keep our Blocmetrics code from colliding with other JavaScript code, I created a namespace for it. The simplest way to do this is to declare an empty object.

Then to test it, I opened one of my previous projects and added this to its application.js file.

Here's how I tested the app.

* Added JavaScript code to the application I wanted to track.
* Trigger the tracked event in your browser, and confirmed that Blocmetrics created a new event.
* Accomplished this by running two Rails apps at the same time by varying their port numbers. To do so, I used the -p <port_number> option.

#### Event graphs

As a user, I want to see a graph of events for each registered application

I used the JavaScript charting library, Chartkick library. Added it to the Gemfile to install it.

Made the following updates on the show page:

Replaced the counts of events with graphs.
Chartkick can generate an events pie chart in one line of code:
<%= pie_chart @registered_application.events.group(:name).count %>

To create a line chart of events over time, I installed the Groupdate gem.
Using Groupdate, Chartkick allows you to create a line chart of events over time with:
<%= line_chart @registered_application.events.group_by_day(:created_at).count %>

So far I was not able to get the charting to work in either development or production.
I shall update this section when I get it to work.

Here are the tests (both failed so far)

* View the show page of a registered application and confirm a pie chart of all events is displayed.
* View the show page of a registered application and confirm a line graph of all events over time is displayed.

## Results

The results were verified through testing each user case.
The final result is a [demo](http://ketan-blocmetrics.herokuapp.com/) site.

## Conclusion

Except for the charting, the app works as ordered!
