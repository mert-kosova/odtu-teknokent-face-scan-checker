A way to control monthly face scan requirement in ODTÜ Teknokent. Script logs in to your user with credentials located on your computer and finds out which days you missed face scans and which weekends you scanned your face. Only goes back to the last 150 scans so if you have scanned your face more than 150 times during current month, you might have some false positives. 

You need to have two files on your home folder, `.tkprofile` and `.tkpassword` with your username and password respectively.

Only requires npm to be installed on your computer.

After `npm install` (which might take some time because of cypress) you need to give `runner.sh` permission to execute with `chmod +x runner.sh`

You can start the runner with npm using `npm run start`

Output will be printed on your terminal and `logs/output.log` file.