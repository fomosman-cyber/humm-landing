# Higgsfield — AI-shots die de motor écht de motor laten

## De kernregel

**Image-to-video vanaf de eigen foto's. Nooit text-to-video.**

Een tekstprompt convergeert op een generieke superbike: verkeerde koplampen,
Ducati-achtige geometrie, willekeurige kleur. Precies wat niet mag. De eigen
foto als startframe zet model, matte lak, koplampsignatuur, velgstreep en
uitlaatpositie vast — het model animeert dáár vanuit in plaats van iets te
verzinnen.

Voor extreme close-ups: **crop de foto eerst** naar 9:16 rond het detail
(koplamp, voorwiel, tank) en gebruik die crop als startframe. Dan klopt het
detail gegarandeerd, want het ís de foto.

## Identiteitsblok — in elke prompt

> matte black Honda CBR600RR 2026 supersport, twin angular LED headlights
> flanking a central ram-air intake duct in the nose, sharp layered fairing
> with small aero winglets, clear double-bubble windscreen, HONDA wordmark on
> the nose fairing, black wheels with a thin red rim stripe, black inverted
> forks, right-side low-mount exhaust

## Rijdersblok — bij elk shot met rijder

> rider in a dark charcoal canvas work jacket, white full-face helmet with a
> black skull-teeth graphic across the chin bar and a dark smoke visor, black
> and grey armoured gloves

## Negative prompt

> Ducati, Yamaha, Kawasaki, Suzuki, BMW, generic superbike, futuristic
> motorcycle, concept bike, neon underglow, sci-fi, red or blue bodywork,
> chrome fairing, single round headlight, sport-tourer, naked bike, cruiser,
> wrong headlight shape, extra exhaust, morphing bodywork, warped wheels,
> distorted spokes, floating rider, deformed hands, extra fingers, text
> artefacts, watermark, cartoon, CGI look, video-game render, oversaturated,
> HDR halo, plastic skin

## Instellingen

| | |
|---|---|
| Model | `veo3_1` |
| Quality | `high`, variant `veo-3-1-preview` |
| Aspect | `9:16` · Duur 4s · ±43 credits |
| Medias | `role: "start_image"`, `value: <media_id>` |

Wordt er een **preset voorgesteld** in plaats van een job aangemaakt, stuur
dan opnieuw met `declined_preset_id: <het id uit de foutmelding>`. Anders
wordt er niets ingediend.

Veo herschrijft je prompt intern en voegt eigen audio toe. Zet AI-audio op
`volume=0.5` of lager in de montage — motorgeluid helpt, maar het mag de
spraak nooit raken.

## Vier shots die de basis dekken

Houd elke insert op **1.2–1.5s** in de montage. Genereer 4s en knip het beste
stuk eruit; de actie zit vaak midden in de clip, niet aan het begin.

**1. IGNITE** — startframe: close-up crop van de voorkant
> Slow cinematic push-in toward the front of this exact [IDENTITEITSBLOK]. Its
> twin LED headlights ignite from cold to full brightness, a hard specular
> highlight travelling across the lens glass. Faint engine vibration, heat
> shimmer rising off the fairing. Keep the motorcycle EXACTLY as in the
> reference image. Overcast daylight, deep blacks, controlled highlights,
> photoreal, shallow depth of field. No people, no text.

**2. SPEED** — startframe: frontale foto
> Low camera near the ground. This exact [IDENTITEITSBLOK], ridden by
> [RIJDERSBLOK], accelerates hard toward the camera and passes very close by,
> exiting frame. Heavy realistic motion blur on the ground and background, the
> motorcycle staying sharp. Natural camera shake as it passes. Overcast Dutch
> street, damp tarmac, photoreal, anamorphic wide angle. No text.

**3. GOLDEN** — startframe: gouden-uur foto
> Slow cinematic push-in on this exact [IDENTITEITSBLOK] parked on brick
> paving in low golden evening light. Long shadows, warm rim light along the
> tank and fairing, dry leaves stirring. Almost no motion beyond the slow
> camera push. Keep the motorcycle EXACTLY as in the reference image.
> Photoreal, 35mm, shallow depth of field, premium automotive commercial.

**4. NIGHT** — startframe: close-up crop
> Night. Slow travelling close-up across the matte black fairing and tank of
> this exact [IDENTITEITSBLOK]. City lights and shop signage smear across the
> bodywork as soft coloured reflections. The HONDA wordmark catches a moving
> highlight. Deep blacks, controlled highlights, no neon underglow. Photoreal,
> 50mm, very shallow depth of field.

## De CDN-val

De **output-CDN `d8j0ntlcm91z4.cloudfront.net` is geblokkeerd** door de
netwerkpolicy. Gegenereerde clips zijn niet lokaal op te halen; ga daar niet
omheen. De **input-CDN `d2ol7oe51mr4n9.cloudfront.net`** is óók geblokkeerd
vanaf hier, maar bínnen de sandbox zijn beide gewoon bereikbaar.

Route om toch te monteren:

1. `media_upload` → presigned PUT-URL voor het eindresultaat
2. `sandbox_exec` met `background: true`: bronclips én AI-clips ophalen,
   monteren, ondertitelen, encoden, en in **hetzelfde commando** uploaden
   (de sandbox verdwijnt ~10s na afloop)
3. `media_confirm`
4. Geef de gebruiker de CloudFront-link

## Verifieer wat je oplevert

Je kunt het eindbestand niet zien. Doe dit dus wel:

```bash
# Gemiddelde helderheid per shot — 0 betekent mislukt/zwart
ffmpeg -ss $T -i V.mp4 -frames:v 1 -vf "scale=120:-1,format=gray" -f rawvideo - |
  python3 -c "import sys;d=sys.stdin.buffer.read();print(sum(d)/len(d))"

# Witte pixels in de ondertitelband — bevestigt ingebrande tekst
ffmpeg -ss $T -i V.mp4 -frames:v 1 -vf "crop=900:70:90:1330,format=gray" -f rawvideo - |
  python3 -c "import sys;d=sys.stdin.buffer.read();print(sum(1 for b in d if b>235))"
```

En haal **één of twee frames écht terug** als kleine JPEG (104px breed, q≈16
past net binnen de output-limiet) om met eigen ogen te zien of de motor klopt.
Stuur nooit AI-beeld door dat je niet gezien hebt — juist dát is het risico
dat de gebruiker je vroeg te vermijden.
