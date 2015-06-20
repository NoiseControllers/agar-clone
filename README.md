# agar-clone

## Introduction
This is a clone of agar.io. In this project we aim to acheive the following. 

- [ ] Hack main_out.js and make the variables and function names readable. 
- [x] Add uploading custom skins features (Done)
- [ ] Add in-game chat feature. (On-going)

##Setup

You can use nginx that support PHP to deploy it on your server. 

### Support your server
Replace the CONNECTION_URL with your own ip and port in main_out.js

###Upload feature
The upload module does two things. The first is to upload a skin onto skins folder. The second is that the client request the server to run checkdir.php every 15 seconds to check what skins are uploaded and add them into knownNameDict. Then the skins can be loaded. 

To make this feature work, you need to give upload.php priviliage to read skins folder. 

```
chmod 777 skins 

```

will make it work.


## Contribution
Pull Request are welcome. 