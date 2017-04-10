# Jiggy Journal

The configurable web journal. Jigger it up to fit your personal needs.

## Features

 - Journal entries (C/R/U/D)


## Quickstart

```
    cp .env_template .env
    vim .env # Configure necessary environment variables
    npm install
    npm run build
    npm start
    open localhost:8033
```

## TODO

 - Lock down permissions in Firebase
 - Over 1MB minified? What? Haven't looked into this yet, but I suspect Firebase
  - Firebase (and FirebaseUI) are responsible for ~425KB of minified JS
  - Angular is responsible for ~285KB of minified JS
 - Media Library
 - Journal templates
 - Journal schedules
 - Separate index.js into initialization subroutines and app main entry point
 - Organize journal stuff more closely together
 - Tests (want to try Jest's module mocking features)
 - Fix 404 errors from MaterializeCSS
