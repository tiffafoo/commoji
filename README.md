**Note: although this project works, it has lost traction. As such it is still missing key features (such as working with husky), and there are arguably better ways to go about it (npm module, commitizen, etc.).**

![logo](https://user-images.githubusercontent.com/11183523/45936482-fca41480-bf84-11e8-862f-44595853327b.png)

<h3>Automatically prepend your git commits with the appropriate emoji.</h3>

## Usage
This will not work with existing husky hooks.

Clone the repo
```bash
$ git clone git@github.com:sirmerr/commoji.git
```

Install module globally: 
```bash
$ npm install -g ./commoji
```

`cd` to the repo of your choice

Initialize commoji  
```bash
$ commoji --init
```

:tada: Commit as usual, commoji is now applied to your repo.
