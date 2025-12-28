# UI Update Plan: Replace Tachyons with Every-Layout Custom Elements

## Steps to Complete

- [x] Update index.html: Replace Tachyons classes (tc, pv5, bg-light-gray, etc.) with every-layout custom elements (<center>, <stack>, <cluster>, <box>) in hero, featured, and about sections.
- [ ] Update \_includes/header.html: Replace Tachyons classes with <cluster> and <center> for header layout.
- [ ] Update \_includes/footer.html: Replace Tachyons classes with <stack> and <cluster> for footer layout.
- [ ] Update assets/css/main.css: Remove Tachyons-specific styles and enhance every-layout variable usage for consistency.
- [ ] Check and update \_layouts/post.html: Verify and replace any Tachyons classes with every-layout elements if present.
- [ ] Run Jekyll build: Generate the site to check for layout issues.
- [ ] Test responsiveness: Verify layout on different screen sizes.
- [ ] Remove Tachyons dependency: If no longer used, remove from project (e.g., from Gemfile or links).
