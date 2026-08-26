What are we implementing? 
Below are 2 coding activity where you will implementing a basic html and javascript template for a journaling website.  For this task, you do not need to follow good design principles, use clear layouts or make the site 'look good'.  You just need to get a bit of experience creating a basic site, and adding some visual elements to the site.  

Your journaling page should have

The name of the user
A date and time (can be static)
An image of the day that the user has already uploaded
A paragraph of text containing an inspirational quote
A text box for the user to enter a note
A place to enter in how many hours of sleep they got
A set of checkboxes for them to mark how they felt today (energetic, anxious, motivated... choose your own labels)
Anything else you want to try.... 
Turn in: 

Code and screenshots for Coding activity 1  
Code and screenshots for Coding activity 2
Code activity 1: Just html and css

If you are new to html, css and javascript, read Tutorial 0, Tutorial 1, and Tutorial 2 here: https://drive.google.com/drive/folders/1wJRjhA5jMkqN3kzeDiFdh8ReZu98RBWF?usp=drive_link

First you are going to make a basic UI using just html and css.  This preliminary site will be static.   For this assignment, you will be graded on adding a variety of elements, applying some style and layout rules.  You do not need to make this look professional or consider usability.  This is just a basic technical exercise, to practice html and css.  

1.  Create an html project.  Starter template here

2.  Open the html file in your favorite editor.  I like sublime text, but you can use anything. 

3.  Edit the html file to add text, buttons, controls, svg elements to create some of the functionalities of a the journal (see above).  These will not be very interactive, because we are not using javascript. 

4. Use css to apply a few style rules.  Give elements class names, in your html code.  Set color of some elements using the class names, Choose a new font and font size.  etc.  For this assignment, you can apply any styling rules or layout rules you choose, even silly ones.  I just want you to understand how you can control the look of your elements using css.  

5. As you go, view the result in your browser.  You can just double click on the html file to view it in the browser.  I suggest Chrome. 

6. Inspect your page using the web developer tools in Chrome (View >> Developer >> Developer Tools).  Look at the elements and where they are onscreen, and the layout and sizing decisions computed by the layout engine in the Chrome browser.  

7. Test out editing the html in the developer console to see immediate changes. 

 

Code activity 2:

Read Tutorial 3 and 4 (follow link above).

For this activity, you will continue with the basic UI you have worked on above.   But now we are going to make it interactive and dynamic.  You will also add text or visuals to the top of the page that summarize the user's entries for the past few days.  As before, this is a technical exercise so focus on getting these features working rather than professional styling or usability.  

1. Serve your website locally (see Tutorial 3)

2. Create an array objects that stores data from the user's entries.  Add some dummy data for a few days before today.  Think about what fields would be useful in this array.  If the user interacts with the page, update the array object for the current day. 

3. Add an event listener for the user's sleep entry and other buttons (e.g., mood checkboxes). 

4. Write a function that loops over this array and computes an average number of hours slept, display this on the page and make sure it updates if the user changes their sleep entry for the day.   Compute the number of days they say they have different feelings (how many days energetic, tired...).  Display this as well and make sure it updates when the user interacts.
