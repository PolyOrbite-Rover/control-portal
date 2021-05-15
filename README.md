# PolyOrbite Rover Control Portal

## What is this project ?
A web application which is hosted on the rover. You can connect any device with a web browser to the same network as the rover, then navigate to the Control Portal to control the rover.

On the portal, you will find:
1. A live video stream from the rover's cameras ;
2. Controls to drive the rover remotely (especially joystick control) -> Feature to be developped ;
3. A map located at the rover's position in the world and means to set waypoints to which the rover will navigate autonomously -> Feature to be developped.

## For developers

### How to setup a development environement on Ubuntu

In a directory of your choice clone the repository

1. `git clone https://github.com/PolyOrbite-Rover/control-portal.git`

Install Node.js if you don't have it already

2. `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
3. `sudo apt-get install -y nodejs`

Install the Angular CLI if you don't have it already

4. `npm install -g @angular/cli`

Install all project's dependencies

5. `cd control-portal`
6. `npm install` or `npm i` for short

### How to run the control portal

Navigate to where you cloned the repository

1. `cd (...)/control-portal`

Start the web server

2. `ng serve` or `npm run start` (`npm run start` runs `ng serve`, its meant to be a shortcut, but it is longer to write)

## What the application looks like right now (or not long ago if it has changed)
![image](https://user-images.githubusercontent.com/5231337/118342489-97b0da80-b4f1-11eb-959f-2da9816edc8c.png)
