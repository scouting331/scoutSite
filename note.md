To connect your automated pipeline to Facebook, you need to configure 8 distinct
Repository Secrets in your GitHub repository settings. The process requires
creating an app on the Meta for Developers portal, assigning permissions,
generating system user tokens that never expire, and saving those keys into
GitHub. [1, 2]

---

## Step 1: The Repository Secrets Checklist

You must add these exact pairs of names to your GitHub Secrets inventory:

| Scouting Unit  | Page ID Secret Name  | Access Token Secret Name                             |
| -------------- | -------------------- | ---------------------------------------------------- |
| Troop 303      | FB_PAGE_ID_TROOP_303 | FB_ACCESS_TOKEN_TROOP_303                            |
| Troop 331      | FB_PAGE_ID_TROOP_331 | FB_ACCESS_TOKEN_TROOP_331                            |
| Pack 303       | FB_PAGE_ID_PACK_303  | FB_ACCESS_TOKEN_PACK_303                             |
| Crew 303       | FB_PAGE_ID_CREW_303  | FB_ACCESS_TOKEN_CREW_303                             |
| Fallback / All | FB_PAGE_ID_DEFAULT   | FB_ACCESS_TOKEN_DEFAULT (Point to your primary page) |

---

## Step 2: How to Find Your Facebook Page IDs

Finding your Page IDs is simple and does not require developer tools:

1.  Log into Facebook and switch your profile to the target page (e.g., Troop
    303).
2.  Go to the page's profile view and look at the URL in your browser address
    bar. The long number at the very end of the URL is your Page ID (e.g.,
    https://facebook.com...).
3.  Alternatively, click the About tab on your page, scroll down to Page
    Transparency, and copy the number listed there. [3]

---

## Step 3: Create a System App on Meta for Developers

Standard developer access tokens expire after 60 days. To generate permanent
tokens that never time out, you must create a Meta App:

1.  Navigate to [facebook.com](https://developers.facebook.com/) and log in with
    your primary Facebook account.
2.  Click My Apps in the top right, then click Create App.
3.  Select Other as the app use case, click Next, and choose Business as your
    app type.
4.  Give your app a name (e.g., Scout Site Automation), select your Business
    Account from the dropdown menu, and click Create App. [4, 5, 6, 7]

---

## Step 4: Generate Permanent System User Access Tokens

1.  From your Meta App dashboard, look at the sidebar and click Tools → Business
    Settings. This opens your Meta Business Suite dashboard.
2.  In the Business Settings sidebar, click Users → System Users. [8, 9]
3.  Click Add to provision a new system user. Name it GitHub Actions Router and
    set the role to Admin.
4.  Select your newly created System User, click Add Assets, choose Pages,
    select all your unit pages, and toggle on Full Control (Everything). Save
    your changes. [10]
5.  With the System User still highlighted, click the Generate New Token button.
6.  Select your App from the dropdown list, and check these exact permission
    scopes:

- pages_manage_posts
  - pages_read_engagement
  - pages_show_list

7.  Click Generate Token. Copy this string immediately. This is your permanent
    Page Access Token. Repeat this generation step for each unique page asset if
    your pages are held across different business accounts. [11, 12]

---

## Step 5: Save the Values in GitHub Secrets

Once you have gathered all your Page IDs and token strings, encrypt them within
your repository configuration panel:

1.  Open your web browser and go to your target GitHub Repository.
2.  Click the Settings tab (the gear icon at the top of the interface menu).
3.  Scroll down the left sidebar to the Security header block, click Secrets and
    variables, and select Actions.
4.  Click the green New repository secret button.
5.  In the Name input field, type the exact variable name (e.g.,
    FB_ACCESS_TOKEN_TROOP_303).
6.  Paste the corresponding token string value into the large Secret text area
    box.
7.  Click Add secret to encrypt and lock down the key. Repeat this process until
    all 8 variable properties match your target configurations. [13, 14, 15, 16,
    17]

If your script triggers but throws a "Permission Denied" log error during
testing, I can show you how to use the Meta Access Token Debugger tool to verify
your token parameters. Would you like me to map out those validation steps?

[1]
[https://gitprotect.io](https://gitprotect.io/blog/how-to-safely-store-secrets-in-github/)
[2]
[https://baserow.io](https://baserow.io/user-docs/configure-facebook-for-oauth-2-sso)
[3]
[https://www.socialmediaexaminer.com](https://www.socialmediaexaminer.com/4-ways-to-use-google-tag-manager-with-facebook/)
[4]
[https://www.digittrix.com](https://www.digittrix.com/scripts/facebook-login-implementation-in-react-and-nodejs)
[5]
[https://docs.n8n.io](https://docs.n8n.io/integrations/builtin/credentials/facebookapp/)
[6]
[https://www.facebook.com](https://www.facebook.com/MetaforDevelopers/videos/get-started-with-the-messenger-api-for-instagram/389112236490456/)
[7]
[https://ckmobile.medium.com](https://ckmobile.medium.com/nextauth-part-8-facebook-provider-2b058b0ae7bb)
[8]
[https://developers.facebook.com](https://developers.facebook.com/documentation/facebook-login/guides/access-tokens)
[9]
[https://fivetran.com](https://fivetran.com/docs/activations/destinations/available-destinations/facebook-ads)
[10]
[https://gist.github.com](https://gist.github.com/michaelkarrer81/88fbc36d99a8a32a83f3efe234f7690a)
[11]
[https://help.zscaler.com](https://help.zscaler.com/uvm/configuring-github-advanced-security-connector)
[12]
[https://mixedanalytics.com](https://mixedanalytics.com/knowledge-base/import-facebook-page-data-to-google-sheets/)
[13]
[https://www.linkedin.com](https://www.linkedin.com/pulse/git-github-punit-dhiman-wouse)
[14]
[https://chrisjhart.com](https://chrisjhart.com/Creating-A-Simple-Free-Blog-Hugo/)
[15] [https://github.com](https://github.com/orgs/community/discussions/170965)
[16]
[https://www.storylane.io](https://www.storylane.io/tutorials/how-to-add-secrets-to-github)
[17]
[https://www.linkedin.com](https://www.linkedin.com/learning/data-pipeline-automation-with-github-actions-using-r-and-python/setting-secrets-and-environment-variables)
