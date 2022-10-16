# # t3d-Model-Viewer

t3d-Model Viewer lets you upload and view 3d (GLB) based models.
This is based on three.js library.

## Features
- Export a 3D model and we will retain the upload model with us.
- Render differ models on our viewer with is compatible with any device.
- Control the projection, size, angle all with your cursor.

## Tech
- [AngularJS] - HTML enhanced for web apps!
- [Spring Boot] - Powering our REST Apis with good, old Java.
- [HTML/CSS] - Obviously!!
- [Three.js] - Star of the show!! ✨✨

## Installation
Start with setting up your own MySQL server and acquire url, username and password.
After doing that fork this repo and continue with IDE of your choice. 

### Backend (Spring Boot)
Locate the `application.properties` file and do the following changes:
```
spring.datasource.url = jdbc:<YOUR_CONNECTION_URL>?useSSL=false&serverTimezone=UTC
spring.datasource.username=<YOUR_USERNAME>
spring.datasource.password=<YOUR_PASSWORD>
```
Run the project in your IDE and "Voila! Your REST APIs are up and running". (I hope!😉 ). Now acquire the endpoint_url and proceed with the setup.

### Frontend (Angular App)
Locate `FileUploadService#baseUrl` and change the endpoint with the endpoint_url we got when we were setting up the backend.

Start with:
```
npm install
```
Followed by:
```
ng serve
```
Note: Please make sure, you have **npm** and **angular-cli** presiding in your system.

# Demo
<a target="_blank" href="https://t3d-model-viewer.herokuapp.com">Live Demo</a>

And star this repository if found useful. 
If there are bug/fixes, feel free to raise Issue/Pull Request.

# Screenshots
<p>
  <img src="https://user-images.githubusercontent.com/47828619/196060631-210f0e21-69ef-469d-9299-56b1959fca15.png" height="300"/> 
  <img src="https://user-images.githubusercontent.com/47828619/196060639-02f5a46f-8408-4313-9bc6-726bc9252e01.png" height="300"/>
</p>

[AngularJS]: <https://angularjs.org/>
[Spring Boot]: <https://spring.io/>
[HTML/CSS]: <https://www.w3schools.com/html/html_css.asp>
[Three.js]: <https://threejs.org/>
