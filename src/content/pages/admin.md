---
title: Admin
sections:
  - color: navy
    layout: auto
    blocks:
      - type: text
        text: |
          # Admin: PagesCMS Editing Guide
  - color: white
    layout: auto
    blocks:
      - type: text
        text: |
          This guide explains how HST editors can update the website through [PagesCMS](https://pagescms.org). It covers the editing screen, page content, images, documents, links, accessibility, saving changes, previews, and publishing.

          PagesCMS edits files in this GitHub repository. The website is built from those files by Astro and deployed through Cloudflare Pages.

          ## The short version

          1. Open PagesCMS and sign in with the email address that has access to the site editor.
          2. Select the `content-edits` branch before changing anything (click the top left dropdown where it says hst-website, then select content-edits).
          3. Edit pages or upload media.
          4. Save each change (auto saves uploaded files, but need to manually click the save button at the top right for other changes).
          5. Ask a site administrator to review the changes.
          6. When a group of edits is ready, an admin will open a pull request from `content-edits` into `main` and merge it after reviewing it.

          The `main` branch is the production branch. Any changes merged into `main` can trigger a live-site deployment. Working on `content-edits` allows us to collect several edits and publish them together, rather than publishing each change individually (which uses more resources).
          
  - color: cream
    layout: auto
    blocks:
      - type: text
        text: |
          ## Important rules

          ### Always check the branch first

          Before editing, look at the branch selector in PagesCMS (the top left dropdown). It should say `content-edits`, not `main`.

          PagesCMS can show content from more than one branch. Selecting the wrong branch can accidentally write directly to the production branch or cause other issues.

          If `content-edits` is not available:

          - Do not select `main`.
          - Refresh PagesCMS.
          - Ask the site administrator if the branch has not been created yet.

          ### Make related edits together

          It is recommended (and best practice) that you make several edits before publishing them. For example, update a program page, upload its new image, and fix its registration link before asking an admin to publish them.

          ### Never put secrets in page content

          Pretty obvious, but do not add passwords, private access links, API keys, payment credentials, private student information, or unpublished personal information to the website. Website content is public once deployed.

          ### Be careful with deletion

          Deleting a page, image, or document may break links elsewhere on the site. Before deleting anything, search the site content for links to it or ask a site administrator. If you're not sure, don't delete it.

  - color: white
    layout: auto
    blocks:
      - type: text
        text: |
          ## Signing in and finding the site

          If you are an editor, a site admin should have sent an email that gives you access to PagesCMS. If you're not sure, ask a site admin. Use the email sign-in option and verify the code it asks for.

          After signing in:

          1. Open the `hst-website` editor.
          2. Choose the `content-edits` branch.
          3. Wait for PagesCMS to load the branch's content.

          If a page appears empty, first confirm that the correct project and branch are selected. 

          ## How saving works

          PagesCMS does not save changes only inside the browser. When you save, it creates a Git commit in the selected branch.

          A commit is a recorded change with:

          - the files that changed,
          - the person or application that made the change,
          - a message describing the change,
          - a time and branch where the change was made.

          A saved PagesCMS change is therefore part of the repository history. If something goes wrong, the site administrator can easily inspect or revert the commit.

          PagesCMS will automatically generate a commit message based on the changes you made.

  - color: cream
    layout: auto
    blocks:
      - type: text
        text: |
          ## Editing a page

          Open the **Pages** tab in the sidebar to see the editable page collection. The current site uses Markdown files with YAML frontmatter (if you're not sure what this is, don't worry about it), but PagesCMS presents the fields as a form so editors do not need to edit the raw Markdown.

          A page normally contains:

          - a dark colored page title section,
          - one or more light colored content sections,
          - content blocks inside each section for organizing special content layouts.

          ### Page title

          The title is used as the page's display title and helps determine its filename. Keep titles short and descriptive, such as `About`, `Contact`, or `Support Us`.

          Changing a title may change the filename or page URL. Treat a title change as a possible link change and ask the site administrator before renaming an established page.

          ### Sections

          A section is a horizontal area of the page, often separated by a line. Each section has:

          - a background color,
          - a layout,
          - one or more content blocks.

          Available background colors are `navy`, `cream`, `white`, `slate`, `gold`, and `transparent`.

          Available layouts include automatic wrapping and one through five columnned grids. Use `auto` or `1 Column` for ordinary content unless there is a clear reason to use columns.

          ### Content blocks

          The available block types are:

          - **Text** — headings, paragraphs, links, lists, and other formatted writing.
          - **Image** — one image with accessibility text and display options.
          - **Button** — a prominent link with text and a visual style.
          - **Content block** — another group of nested blocks with its own color, style, and layout.
          - **Embed** — a calendar, video, any other embeddable content (YouTube, Google Calendar, Google Maps, etc.).
          - **Gallery** — multiple images displayed as a slideshow.
          - **Timeline** — mostly only used for program timeline page.

  - color: white
    layout: auto
    blocks:
      - type: text
        text: |
          ## Writing and formatting text

          PagesCMS provides a rich-text editor for normal writing, just like a word processor. YOu can use headings, paragraphs, lists, links, and many other formatting options.

          ### Buttons

          Use a button for an important action such as registration, contacting HST, donating, or viewing a schedule. Use ordinary text links for secondary references.

          Button text should describe the action:

          - `Register for classes`
          - `Contact HST`
          - `Support HST`
          - `View the calendar`

          Make sure the button URL is complete and starts with `https://` for an external site, or uses the correct internal path for this website.

  - color: cream
    layout: auto
    blocks:
      - type: text
        text: |
          ## Images and galleries

          ### Uploading an image

          Click the **Images** tab in the sidebar to upload an image. Images are stored in `public/assets/uploads/images` and are available on the website under `/assets/uploads/images`.

          Use descriptive filenames before uploading when possible, lowercase and with dashes instead of spaces. For example:

          - `2026-spring-show-rehearsal.webp`
          - `acting-class-group.webp`
          - `dance-performance-2026.webp`

          Avoid filenames such as `IMG_1234.webp` or `final-final.webp` since they can be confusing to future editors.

          ### Image format

          The site's image collection is configured for WebP images. Convert images to WebP before uploading. WebP normally provides a smaller file than an equivalent camera JPEG while keeping good visual quality. You can use this free local tool: [LocalConvert](https://localconvert.com/).

          ### Alt text

          Alt text is optional, but it describes the meaningful content of an image for visitors who use screen readers or cannot load images.

          Good alt text:

          - `Students performing a dance routine on stage`
          - `HST students rehearsing a scene in a classroom`

          Poor alt text:

          - `image`
          - `photo`
          - `IMG_7300`

          If an image is purely decorative and the surrounding text already provides all of its meaning, you can leave the alt text blank. Avoid identifying children by name in image alt text for privacy reasons unless the organization has specifically approved that wording.

          ### Image display options

          Image size controls the maximum display width. Use `medium` for ordinary supporting images, `large` for prominent images, and `full` only when the image should span the full width of the available content area.

          Crop options are:

          - `natural` — show the complete image without forced cropping.
          - `landscape` — crop to a wide frame.
          - `square` — crop to a square frame.
          - `portrait` — crop to a tall frame.

          Use `natural` when cropping could remove an important person or detail.

          ### Galleries

          Use a gallery for several related photos. Select the images in the intended order using the media picker, then choose an appropriate size and crop for the gallery. You can choose to show or hide the gallery controls and dot indicators.

  - color: white
    layout: auto
    blocks:
      - type: text
        text: |
          ## Uploading documents and PDFs

          Click the **Documents** tab in the sidebar to upload a document. Documents are stored in `public/assets/uploads/documents` and are available on the website under `/assets/uploads/documents`.

          The document collection is configured only for PDF files for now. Before uploading:

          1. Use a descriptive filename, such as `2026-hst-business-donation-letter.pdf`.
          2. Check that the PDF opens correctly on a computer and a phone.
          3. Check that the PDF does not contain private information or accidental comments.

          When linking to a PDF, use the PagesCMS file picker to select the document.

          After uploading or replacing a document, open the final link in a private browser window and confirm that it downloads or displays the PDF. If it shows the website homepage instead, the path may be wrong or the file may not have been deployed yet.

  - color: cream
    layout: auto
    blocks:
      - type: text
        text: |
          ## Embeds and calendars

          The site supports `calendar` and `youtube` embeds, with more options added as requested.

          For a calendar:

          - Use the calendar provider's HTTPS embed URL.
          - Do not paste the normal public webpage URL if the provider gives a separate embed URL.
          - Confirm that the calendar does not expose private events or personal information.

          For videos:

          - Use the video's HTTPS embed URL.
          - Check that the video is public or unlisted as intended.
          - Add an accessibility title that explains what the video contains.

          Every embed has an accessibility title. Write a short, useful description such as `HST spring show rehearsal video` or `HST upcoming events calendar`.

          Embeds depend on external services. If an embed is blank, slow, or shows an error, test the original provider link in a separate browser tab.

  - color: white
    layout: auto
    blocks:
      - type: text
        text: |
          ## Common problems and fixes

          ### “I cannot see the project

          Confirm that you are signed in with the email address that has access to the site editor.

          ### “My saved edit is not on the live site”

          Edits are not expected to appear on the live site until the `content-edits` branch is merged into `main` and the production deployment completes.

          ### “A PDF link shows the homepage”

          The path may be wrong or the file may not have been deployed. Confirm the exact uploaded filename and test the link after the production deployment.

          ### “I made a mistake”

          You can just make a new edit to fix the mistake. Alternatively, tell the site administrator what changed and when. Git records the change, so an administrator can inspect the commit and revert or correct it.

          ### “PagesCMS shows a conflict”

          Stop editing that item until the conflict is understood. Another commit may have changed the same file. Ask the site administrator to review the competing changes rather than overwriting someone else's work.

  - color: navy
    layout: auto
    blocks:
      - type: text
        text: |
          ## Quick reference

          **Production branch:** `main`

          **Editing branch:** `content-edits`

          **Page content:** `src/content/pages/`

          **Images:** `public/assets/uploads/images/`

          **PDF documents:** `public/assets/uploads/documents/`

          **PagesCMS configuration:** `.pages.yml`

          **Local development command:** `npm run dev`

          **Production build command:** `npm run build`

---
