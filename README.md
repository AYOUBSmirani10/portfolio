
  # Regrade .txt file

  This is a code bundle for Regrade .txt file. The original project is available at https://www.figma.com/design/9XJzDwXmmAotVRh1bE8UzU/Regrade-.txt-file.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  For a production-like run:
  - `npm run build`
  - `npm start`

    ## Deploy on Vercel

    1) Push the project to GitHub (make sure `.env.local` is not committed).

    2) In Vercel: **Add New… → Project** and import the GitHub repo.
      - Framework preset: **Next.js** (auto-detected)
      - Build command: `npm run build` (default)
      - Output: `.next` (default)

    3) Add Environment Variables in **Project Settings → Environment Variables**:
      - `HUGGINGFACE_API_KEY` (required)
      - `HF_MODEL` (optional) e.g. `google/gemma-2-2b-it:fastest`

    4) Deploy. The AI endpoint will be available at `/api/chat`.

    Notes:
    - If `/api/chat` returns `model_not_supported`, enable at least one Hugging Face Inference Provider in your HF account settings and redeploy.
  