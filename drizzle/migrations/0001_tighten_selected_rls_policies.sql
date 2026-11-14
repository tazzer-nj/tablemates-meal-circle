DROP POLICY IF EXISTS "Public reads post hashtags" ON public.post_hashtags;
CREATE POLICY "Public reads hashtags for visible posts"
ON public.post_hashtags
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.posts AS p
    WHERE p.id = post_hashtags.post_id
      AND p.is_hidden = false
  )
);

DROP POLICY IF EXISTS "Public reads feature flags" ON public.feature_flags;
CREATE POLICY "Public reads supported feature flags"
ON public.feature_flags
FOR SELECT
TO anon, authenticated
USING (key IN ('cooking_mode', 'personalized_planner'));

DROP POLICY IF EXISTS "Anyone reads app settings" ON public.app_settings;