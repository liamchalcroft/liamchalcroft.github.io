# Moving to a custom domain

Nothing on this branch switches the domain. Do these steps in order: if a `CNAME` file lands before DNS is set up, the site goes offline.

1. **Buy the domain.** `liamchalcroft.com` is the obvious choice. `.dev` forces HTTPS, which is fine because Pages serves HTTPS anyway.
2. **Verify it with GitHub first.** Under *GitHub → Settings (your account) → Pages → Add a domain*, add the TXT record GitHub gives you. This stops anyone else claiming the domain for their own Pages site.
3. **Set up DNS** at the registrar:
   - Apex (`liamchalcroft.com`): four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus `AAAA` records to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
   - `www`: a `CNAME` to `liamchalcroft.github.io`.
4. **Point the site at it.** In the repo's *Settings → Pages → Custom domain*, enter `liamchalcroft.com` and wait for the DNS check. Tick *Enforce HTTPS* once the certificate has been issued (this can take up to an hour).
5. **Update the code** in one commit:
   - `astro.config.mjs`: `site: 'https://liamchalcroft.com'`
   - `src/lib/site.ts`: `url: 'https://liamchalcroft.com'`
   - Add `public/CNAME` containing `liamchalcroft.com`. With Actions deploys, the Settings field is what counts, but the file documents it.
6. **Afterwards:** `liamchalcroft.github.io` redirects to the new domain automatically. Update Google Scholar, ORCID, LinkedIn and your GitHub profile links, and add the domain in Google Search Console.

Check the IPs above against GitHub's current docs ("Managing a custom domain for your GitHub Pages site") before entering them; they change rarely, but they do change.
