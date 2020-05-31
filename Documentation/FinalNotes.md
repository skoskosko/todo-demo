# Database

My database stayed the same till the end of the project. So i quess my planning there was spot on. At some point i wondered if it would have been better to use before relation instead of after, but in the end it doesn't make so much of a difference. 

I planned to use flyway, but I in the end because of typescript and typeorm i decided to go with its database migration tools. So there was a little bit of useless work due to my inexperience with typeorm library. (And at that point i did not really know that i would be using it.)

# Backend

Making of backend was quite easy task. I did not find any readymade templates with node + typescript + jest + eslint so i pieced it together. I personally think i did quite well. 

There was nothing special in the code I made. This kind of application does not need any special tricks. Level of documentation in my node project is preferable to me. There is not too much of it so it is not like reading a book, but there is some so reader gets some kind of an idea. 

I could have made more tests, but making tests is always one of those kind of jobs that you do because you need to. Meaby I have mindset problem. I enjoy quite a lot to build nice automation test systems but when i should write the tests it becomes a chore. 

# Frontend

I tried to make this project with react + typescript but midway trough i decided to stick with just pure react. This was becuase unlike with node I did not know how it should look normally so reading documentation from the internet got quite hard when not really knowing if it was typescript or normal syntax. Also most of the documentation seems to be for pure react. 

I did not write a lot of tests there is no excuse for this. I am just lazy. There is a lot of stuff i could have tested. I made everything with functional react so everything could have been easily tested like i did with NoteDeleteDialog. I did not want to use my time for writing tests. If in the future someone reads this and there is tests for react parts. Check the commit dates, they were written after this "Project is now done" document!

Overall react seemed quite fun to write. It was a little bit more fiddly than vue. That might be due to inexperience or because of some extra features that react has baked in vs vue. 

# CI

First I thought i would use Jenkins. But i remebered that i did not have jenkins installed on my server. Also i did not want to install it and host jenkins just for this. 

Midway trough i thought that meaby i should use travis. But it seems to be designed more for testing and pushing docker images to hub was more of a aftertought. (Probably not but that was that it seemed to me.) 

Finally i decided to use github actions. They are free and i quite like the syntax. I have done some of them before and they provide seemless integration with github (suprise suprise). 

I Made two seperate actions. One for testing and one for pushing master to dockerhub. I could have added some cool features like automatic tags and included tests in the dockerhub pushing one so I would not accidentally push broken images. But I work on this alone so I did not see those features as necessities.

# Publishing

I had wanted to test aws cloudformation with something. So this was a good opportunity to muster up some motivation to do it. 

I was pleasently suprsied of how easy and fast using cloudformation was. Everything was logically laid out and easy to write. I wrote everything by hand, I tried using the designer but that was little bit too complicated for me. Meaby I can use it when I have written some more yamls by hand. 