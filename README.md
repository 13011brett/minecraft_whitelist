```
                        ___  ____                            __ _     _    _ _     _ _       _ _     _   
                        |  \/  (_)                          / _| |   | |  | | |   (_) |     | (_)   | |  
                        | .  . |_ _ __   ___  ___ _ __ __ _| |_| |_  | |  | | |__  _| |_ ___| |_ ___| |_ 
                        | |\/| | | '_ \ / _ \/ __| '__/ _` |  _| __| | |/\| | '_ \| | __/ _ \ | / __| __|
                        | |  | | | | | |  __/ (__| | | (_| | | | |_  \  /\  / | | | | ||  __/ | \__ \ |_ 
                        \_|  |_/_|_| |_|\___|\___|_|  \__,_|_|  \__|  \/  \/|_| |_|_|\__\___|_|_|___/\__|
                                                                                                         
                                                                                                         
                          ___                    _   _           _   _                                   
                         / _ \                  | | | |         | | (_)                                  
                        / /_\ \_ __   _____  __ | |_| | ___  ___| |_ _ _ __   __ _                       
                        |  _  | '_ \ / _ \ \/ / |  _  |/ _ \/ __| __| | '_ \ / _` |                      
                        | | | | |_) |  __/>  <  | | | | (_) \__ \ |_| | | | | (_| |                      
                        \_| |_/ .__/ \___/_/\_\ \_| |_/\___/|___/\__|_|_| |_|\__, |                      
                              | |                                             __/ |                      
                              |_|                                            |___/
                         _                               _   _____    _ _ _   _                          
                        | |                             | | |  ___|  | (_) | (_)                         
                        | |     __ _ _ __ __ ___   _____| | | |__  __| |_| |_ _  ___  _ __               
                        | |    / _` | '__/ _` \ \ / / _ \ | |  __|/ _` | | __| |/ _ \| '_ \              
                        | |___| (_| | | | (_| |\ V /  __/ | | |__| (_| | | |_| | (_) | | | |             
                        \_____/\__,_|_|  \__,_| \_/ \___|_| \____/\__,_|_|\__|_|\___/|_| |_|             

by Brett Scarlett
```


![Laravel Banner](https://laravel.com/img/logomark.min.svg)![Apex Hosting Banner](https://cdn.apexminecrafthosting.com/assets/images/apex_logo.webp)             




# Introduction

Welcome in! This project was made from a previous [challenge](https://github.com/13011brett/apex_challenge), given to me by Apex Hosting as seen in the lovely ASCII art above. It is composed of `Laravel` for the back-end & `React` for the front-end, utilizing Inertia as a bridge in some ways.

The purpose of this project is quite simple in nature; a CRUD interface for users to store their whitelist(s), and users within them, while also giving ease of use adding said users for the video game Minecraft. This project utilizes the [Mojang API](https://wiki.vg/Mojang_API#Usernames_to_UUIDs) to create proper whitelists within the web interface, and stores them within a table on a database as well as a file in local storage. I would prefer this to be stored in cloud storage for a real world use case of course.

I feel that this project could be expanded to easily create a server startup packager, or even just a server browser viewer, getting plugins from other places and then wrapping it up for either self hosted or for game hosting servers.

If you would like to try it out without going through the quick setup, go ahead and go to my [site](http://apex.scarletttech.com) (hosted over http since I didn't setup the cert as of writing this).

# Goals

- [x] Build and setup the application using Laravel Breeze, with React and Inertia as the frontend for a full stack.
- [X] Setup within Docker for ease of use.
- [ ] Build within a Dev Container
- [x] Create a CRUD interface for both Whitelists (dashboard view), and individual Whitelists.
- [x] Store the JSON in database and locally for ease of use.
- [x] Incorporate Auth into the project for each route.
- [ ] Add ability to search within Whitelists & Whitelist Users.
- [x] Utilize Mojangs Bulk API to mass add users.
- [x] Ability to quickly download `whitelist.json`, formatted properly for ease of use. 


# Setup Info

- Requirements: Docker Compose (Included in Windows & Mac's Docker Desktop, may need to be added separately via linux).
    - [Windows](https://docs.docker.com/desktop/install/windows-install/) -- I highly recommend using WSL for the integration, and running this within WSL (default dev environment).
    - [Mac](https://docs.docker.com/desktop/install/windows-install/)
    - [Linux](https://docs.docker.com/desktop/install/linux-install/)
 
This project uses Docker Compose via [Sail](https://laravel.com/docs/11.x/sail), which allows us to easily startup all containers pretty seamlessly with ease of access into said containers via the `./vendor/bin/sail` command, which will throw commands into the laravel container (for example, `./vendor/bin/sail artisan migrate:fresh --seed` will actually run the migrations on the laravel container without being executed inside of it, as seen further below).

To get started, I have created a shell script that will install the containers and do everything necessary. I recommend running this in a screen, or a separate terminal, as it is not detached by default (by design for development).
The script is in the root directory, `./start.sh`, go ahead and run that. First time run may take 5 - 10 minutes. `CTRL+C` will close the container if you're still attached, otherwise you can do `./vendor/bin/sail down` to shut down all active images.

After that is complete, it should automatically be up and running at `http://localhost` as long as nothing else is bound to port 80.
The `docker-compose.yml` is setup accordingly, and will also be running `npm run dev` by default to support hot reloads. Feel free to modify.

Migrations will automatically run by default, but will not seed. If you would like a fresh build with all migrations re-ran and seeded data, run `./migrate_and_seed.sh` while the container is actively running.

# Closing Thoughts

This project was a lot of fun and fresh, using a new and very modern stack added a very snappy feeling to building this all up. Thanks for reading, and until next time!
