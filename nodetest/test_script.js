console.log(process.env);

# create a package.json file
npm init

# install a package save package filename in package.json
# all installed packages are stored inside node_modules directory where you ran the command
npm install package-name --save

# install a package globally (it is available now anywhere on your computer)
npm install package-name -g
# (Mac/Linux users: sudo npm install package-name -g)

# remove a package from node_modules and remove package filename from package.json
npm uninstall package-name --save

to git commit:
- git status
- make sure there are no .. and if there are, get to there with cd ..
- then add everything together with git add --all
- check status with git status
- then commit with git commit -m "write what u changed here"
- git push origin mayli10
