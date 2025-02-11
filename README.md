# Voleyball team

 This project is a hosted live website for the voleyball organisation Heaven-07. It works as a porftolio if somebody wants to get familiar with the organisation's players, coaches, staff and purposes.


 You can access the website live here [Heaven 07](https://www.heaven-07.com/).

 ## Features

 ### Public part
  
  - **Sign in / Sign up :**

    In Sign in a user can get into their account if they already created one. In Sign up a user can create an account if they haven't yet.
![Alt text](image-2.png) ![Alt text](image-3.png)

 - **Home page :** 

 Home page displays the organization's athletes. When a user hovers over an atheles's picture a **View profile** button appears, which when clicked navigates to a **detailed page** of the clicked athlete.
![Alt text](image.png) ![Alt text](image-1.png)
 - **Detailed athlete page :**
  
  The page contains a video highlight of the athlete and the athlete's description placed under the video.
![Alt text](image-4.png) ![Alt text](image-5.png)
- **Coaches :**

Coaches page visualises the coaches of the organization.Same as the athelete's pictures, when a coach's picture is hovered a **View profile** button appears which when clicked visualises the specified coach's **detailed page**
![Alt text](image-6.png)
- **Detailed coach page :**

The page contains the coach's picture in bigger size and the coach's description in the form of text.
![Alt text](image-7.png)
- **About us :**

About us page is the page where u can learn eveyrthing about Heaven-07.
![Alt text](image-8.png)
- **Contact / Contact us:**

Contact page is where you can directly send a message to the organization by filling the 3 input fields (**Name**, **Email** and **Message**) and completing the **reCaptcha** which prevents spam.
![Alt text](image-9.png)
  

### Administrative part
An authenticated user with admin role has the following features : 

- **Home :** 

1. At the home page admin can directly delete an athlete from the realtime database by clicking on a button **Delete** which will appear on the hovered athlete under the **View profile** button.![Alt text](image-10.png)
  
2. Admin can also create a new athlete which will be added to the realtime database by clicking on the button **Add new athlete** and filling the form.
![Alt text](image-11.png)

- **Detailed athlete page :**

A user with admin role can directly delete the video of the athlete and add a new one or change the description.
![Alt text](image-12.png)

- **Coaches :**

The functionality in this page is the same as in **Home** but for coaches.![Alt text](image-13.png)![Alt text](image-14.png)

- **Detailed coach page :**
As the coach has only description in the detailed page the admin can only manipulate the description.![Alt text](image-15.png)

### Changing theme

The user can change the theme between light and dark by clicking on the moon or sun (depends which one the user has at the moment).![Alt text](image-16.png)![Alt text](image-17.png)



## Technologies 

- React: Used for building the user interface.
- Chakra UI: Used for styling the components.
- Firebase: Used for authentication and storing data in a NoSQL database.
