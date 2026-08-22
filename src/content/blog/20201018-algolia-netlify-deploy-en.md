---
title: "How to set Algolia by Netlify deploy"
excerpt: "Cause lazy, so I want to find a way to setting Algolia automatically."
publishDate: "2020-10-18T00:00:00.000Z"
category: "lifestyle"
author: "kaixsean"
image: "https://img.kaixsean.com/2020/netlifySettingAlgolia.png"
tags: ["blog"]
---

Cause lazy, so I want to find a way to setting Algolia automatically. At first, I found the [Travis CI - Test and Deploy with Confidence](https://travis-ci.com/) could do. But actually, the Netlify also has a service like that, when you deploy.  

First, you have to set the file, Netlify.toml in the root. Tell the system, have to execute these command when the Netlify builds and deploy at next time

****Netlify.toml****

```
[build]
publish = "_site"
command = "jekyll build & jekyll algolia"
```

Although you set the setting, it still gets wrong. Cause we are not setting the Algolia API Key yet. You have to go to the Build & Deploy menu, set the environment variable values

****Deploy setting****

![Netlify Setting Algolia](https://img.kaixsean.com/2020/netlifySettingAlgolia.png)

That’s all. When you post a new article, the Netlify will execute the command, and upload the data of article information to Algolia.

![Netlify Environment Variables](https://img.kaixsean.com/2020/netlifyEnvironmentVar.png)