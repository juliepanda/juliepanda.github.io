---
layout: post
title: "Bitcamp: Stardazed"
date: 2015-04-14
tags: hackathons projects
---

# Bitcamp '15 Submission: Stardazed
Don't you ever get tired of looking at your friends' faces and wish that they could look hotter than they are? Worry no more. Chelsea and I have built a solution for you where you could wear an Oculus (or any other VR/AR devices that works with MozVR) with a camera where our hack with replace every face you see with a celebrity's face of your choice. Just imagine the world where  Ryan Gosling is everywhere.

Check out our hack for Bitcamp on [ChallengePost](http://challengepost.com/software/stardazed) or [Github](https://github.com/chelseavalentine/Stardazed).

### Motivation
For all the hackathons that I have been going to, I have been exploring the limits of which you could do with a camera. The logical step up would be some sorts of Augmented Reality that requires even more understanding of the manipulation of visual data in real-time. One of the major libraries used in these sort of hacks is OpenCV, which I am very interested in understanding more about. For this particular hack, we leveraged the Haars Classifiers that are available in OpenCV to identify faces and defined areas to overlay the celebrity's face over on a frame-by-frame basis.

### Challenges
Using the OpenCV library was fairly straightforward for me. I first built the hack in Python and then built it in javascript with Tracking.js when we realized that the experimental Mozilla browser, MozVR, works with the Oculus headset, and both Chelsea and I have had experience of building things with javascript in browser. We ran into major problems with configuring Unity and the Oculus SDK partially because of the shitty internet at Bitcamp but partially because neither of us are proficient in C#/C++ which are what the two engines are based on. Ultimately, since we settled on this particular hack after 15 unfruitful hours of wrestling with Myo armbands, we didn't have enough time to completely optimize the browser view for the Oculus, but we are working on making it perfectly compatible this week and submitting it towards some other VR Challenges.

### In the Future
I aim to implement more Oculus VR hacks as well as Augmented Reality hacks with Google Cardboard. Right now, I think a really cool hack would be to leverage the OpenCV library and an AR Drone to get some sort of in-person delivery hack going.