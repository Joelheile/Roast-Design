# Getting started with Roast.Design

Hey together! I'm very happy that you are having a look at my CODE Challenge project.
I hope that you've read my text about the purpose of this tool.
It's for having a single place where all feedback is gathered. And placed visually where it belongs - no matter what medium.
That's how we eliminate many feedback loops where nobody knows where the feedback belongs to.

## Web app

I wanted this project to be a web app which can be used from every device.
That's why I used the React.js framework, which I learned in many days of work from scratch.

## Localstorage and Databases

User Management is done in a Google Firestore database and every project and image is added there.
There is a bug I can't figure out on how to update the moved comments location inside of the comment collection without deleting all the comments and creating new ones.
That's why I chose to save all the comments in the browsers localstorage, because for testing an MVP, storing in the cloud is not necessary.
This is the reason why you can copy the project link, but if you send it to someone external, it won't show anything yet.

The passed information from the projects page to comment page are not there when someone is not logged in.
I tried a lot of different ways on how to query all projects and select it with the ID of the URL, but it wasn't as reliable as local storage.

That's why it is only working correctly on your pc/mac/laptops browser :)

## Responsiveness

The web app is mostly responsive. Sadly not at the commentProject page, because it's very difficult to resize the webview (iframe) dynamiccly.
So the best experience is on a bigger screen.

## Components

The code is a bit messy and not put into different components because I developed it on the go while I learned the language and how my use case could be built.
I'll rewrite the functions and separate them soon, but now it's easier to understand how every function works.

## The learnings

I had a lot of fun diving into this new coding experience and it was awesome seeing how fast my skills developed.
Nevertheless I had many challenging tasks on how to pass information between screens or from the database.
There are still many bugs left and much space to improve. But it was a great way to learn a new programming language fast.

I think this tool can help a lot of people and therefore I want to continue developing it.
Hopefully with more soon acquired coding skills at CODE and help from other peers.
