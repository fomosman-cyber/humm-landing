---
name: moto-tiktok-cinematic
description: >
  Bouwt cinematische verticale motor-TikToks voor @iamhummrider (Honda CBR600RR 2026) uit ruwe telefoonclips: footage-audit, Higgsfield AI-inserts vanaf de eigen bikefoto's, Nederlandse ingebrande ondertiteling via Whisper, effecten, grade en export. Gebruik deze skill ALTIJD wanneer de gebruiker een motorvideo, TikTok, Reel, Short of edit wil maken of verbeteren — ook als ze alleen zeggen "maak hier een video van", "edit dit", "voeg ondertiteling toe", "maak de beelden beter", "caption voor dit", "nieuwe film", of clips/foto's van de motor sturen zonder verdere uitleg. Trigger ook bij losse onderdelen: ondertiteling maken, transcriberen, Higgsfield-shots genereren, kleurcorrectie, of exportinstellingen voor TikTok. Niet gebruiken voor HUMM Amsterdam streetwear-content — daarvoor bestaan de humm-* skills.
---

# Cinematische motor-TikTok — @iamhummrider

Merk: **@iamhummrider** · Motor: **Honda CBR600RR 2026**, mat zwart ·
Formaat: **9:16, 1080×1920, 30fps** · Taal: **Nederlands**

Stijl: premium, echt, scherp, diepe zwarten, gecontroleerde highlights.
Nooit: goedkope AI-look, gaming-trailer, CapCut-template, over-edit.

---

## 1. Kijk eerst naar de beelden. Altijd.

De verleiding is om meteen een tijdlijn te bedenken. Doe dat niet. Wat de
gebruiker denkt te hebben gestuurd en wat er daadwerkelijk in de bestanden
zit, loopt regelmatig uiteen — en een plan op verkeerde aannames kost meer
tijd dan de audit.

```bash
bash scripts/audit.sh <map-met-clips>
```

Dat script draait `ffprobe` op elk bestand en bouwt contactvellen. Bekijk ze
daadwerkelijk met de Read-tool. Let op:

- **Aantal bestanden.** Zijn alle beloofde clips er echt?
- **Rotatieflag.** iPhone-clips staan vaak opgeslagen als 1920×1080 mét
  `rotation=-90`, en tonen dus verticaal. `ffprobe` liegt hier; controleer de
  side-data, niet alleen width/height.
- **Klopt de inhoud met de beschrijving?** "Rijbeelden" bleek in de praktijk
  een stilstaande selfie bij een tankstation. Dat verandert de hele montage.
- **Welke motor staat er in beeld?** Een andere kleur motor tussen shots leest
  als twee verschillende motoren en sloopt het premiumgevoel.
- **Merkrisico's.** Sigaretten in beeld drukken het bereik op TikTok. Meld het
  en los het op met kadrering of een ondertitelblok eroverheen — knip nooit in
  de spraak om dit te verbergen.

Meld afwijkingen meteen en concreet, vóór je iets bouwt. Lever daarna gewoon
wat wél kan; de gebruiker beslist of ze bijfilmen.

---

## 2. Transcriptie — via de Higgsfield-sandbox

In deze omgeving zijn Hugging Face, de OpenAI-modelhost en alphacephei
geblokkeerd door de netwerkpolicy, dus lokaal Whisper draaien lukt niet. De
**Higgsfield-sandbox heeft faster-whisper voorgeïnstalleerd én internet**. Dat
is de route.

```
mcp__Higsfield__sandbox_exec, background: true
```

Zie `references/whisper-sandbox.md` voor het volledige commando. Kern:

- Haal de clip binnen via de Higgsfield media-URL (input-CDN werkt daar wél)
- Draai **`large-v3`**, `language='nl'`, `word_timestamps=True`
- Draai hem **twee keer**: op ruwe audio én op een ontruiste versie. Komen ze
  overeen, dan is het betrouwbaar. Verschillen ze, dan weet je waar je moet
  luisteren.
- De sandbox wordt ~10s na een call weggegooid; gebruik `background: true`
  (15 minuten lease) en poll het `.exit`-bestand.

### Omgaan met onzekere woorden

Whisper geeft per woord een betrouwbaarheid. Gebruik die.

- **Boven ~0.8:** gewoon plaatsen.
- **Onder ~0.5:** niet plaatsen. Dat is geen preutsheid maar nauwkeurigheid —
  een gegokt woord in beeld legt de gebruiker woorden in de mond die hij niet
  zei, en bij een scheldwoord kost het ook nog bereik. Laat het weg, houd de
  audio onaangeroerd, en meld precies wat je oversloeg en waarom.
- Leg de betrouwbaarheid per regel vast in een leesmij, zodat de gebruiker
  gericht kan terugluisteren in plaats van de hele clip.

Verzin nooit dialoog. Als transcriptie helemaal niet lukt, lever dan lege
cue-vensters die je uit de audio-envelope hebt gemeten (`astats` op 128ms) —
dat is eerlijk en nog steeds bruikbaar.

---

## 3. Higgsfield — identiteit vastzetten met de eigen foto's

Dit is de belangrijkste technische keuze in de hele workflow.

**Gebruik image-to-video vanaf de foto's van de gebruiker. Nooit
text-to-video.** Een tekstprompt convergeert altijd naar een generieke rode of
blauwe superbike met verzonnen koplampen — precies wat niet mag. De eigen foto
als startframe zet model, matte lak, koplampsignatuur en velgstreep vast, en
het model animeert dáár vanuit.

Voor extreme close-ups: **crop de foto eerst** naar 9:16 rond het detail en
gebruik die crop als startframe. Dan klopt het detail gegarandeerd.

Model: `veo3_1`, `quality: high`, `variant: veo-3-1-preview`, `9:16`, 4s
(±43 credits per shot). Wordt een preset voorgesteld in plaats van een job,
stuur opnieuw met `declined_preset_id`.

Identiteitsblok om in elke prompt te plakken, plus de volledige negative
prompt: zie `references/higgsfield.md`.

---

## 4. De CDN-val — en hoe je eromheen bouwt

Higgsfield's **output-CDN (`d8j0ntlcm91z4.cloudfront.net`) is hier
geblokkeerd**. Gegenereerde clips zijn dus niet lokaal te downloaden. Ga daar
niet omheen — dat is organisatiebeleid.

Bouw in plaats daarvan **de hele montage in de sandbox**, waar beide CDN's wél
bereikbaar zijn:

1. `media_upload` → presigned PUT-URL voor het eindresultaat
2. `sandbox_exec` (background): bronclips + AI-clips ophalen, monteren,
   ondertitelen, encoden, en in hetzelfde commando uploaden naar die URL
3. `media_confirm`
4. Geef de gebruiker de resulterende CloudFront-link

**Controleer altijd wat je oplevert.** Je kunt het bestand niet zien, dus:
meet de gemiddelde helderheid per shot (zwart = mislukt), tel witte pixels in
de ondertitelband (bevestigt ingebrande tekst), en haal één of twee frames
terug als kleine JPEG om écht te kijken of de motor klopt. Stuur nooit
AI-beeld door dat je niet gezien hebt.

Lever daarnaast altijd een lokaal gebouwde versie die je wél volledig kunt
inspecteren — dan heeft de gebruiker iets betrouwbaars in handen.

---

## 5. Montage

Bouw per segment een los mp4 met identieke parameters en plak ze daarna met de
concat-demuxer. Dat is beter te debuggen dan één reuzen-filtergraph, en je
kunt één segment opnieuw renderen zonder de rest aan te raken.

Ritme dat werkt:

| | |
|---|---|
| Cold open | 0.7–1.2s glitch of koplamp-ignite. Hook. |
| Praatclip | **vol en onaangeraakt**, inclusief het einde. Subtiele push-in 100→105%. |
| Titelkaart | 2.2s `HONDA CBR600RR / 2026` |
| B-roll | blokken van 3–6s, elk met een eigen beweging |
| AI-burst | 1.2–1.5s per insert, snel achter elkaar |
| Hero | **echt beeld**, 4s, vasthouden |
| End frame | 2.5s `@iamhummrider` + tagline |

Twee regels die het verschil maken:

- **Knip nooit in de spraak.** De montage schikt zich naar het verhaal, niet
  andersom. Loopt een zin tot de laatste frame, dan loopt de ondertitel mee.
- **Eindig op echt beeld, niet op AI.** Eindigen op een gegenereerd shot voelt
  nep. Eindigen op het eigen gezicht of de eigen helm niet.

Houd echte beelden boven de 60% van de looptijd. AI kruidt, vervangt niet.

Alle filterstrings (grade, zoom punches, rgbashift-glitch, shake, flash
frames, vignette) staan kant-en-klaar in `references/ffmpeg.md`.

---

## 6. Ondertiteling

Nederlands, wit, onderaan, ingebrand. ASS-formaat geeft de beste controle;
het complete stylesheet staat in `references/ffmpeg.md`.

| | |
|---|---|
| Kleur | `#FFFFFF` 100% — alleen wit, nooit gekleurd |
| Font | Liberation Sans **Bold** (of Inter/SF Pro), nooit Black |
| Grootte | 62px, 70px op 1–2 nadrukregels |
| Rand | 3.4px zwart + schaduw |
| Positie | gecentreerd, onderkant op **Y≈1360px** |
| Veilig | **niets onder Y=1500** — daar zit de TikTok-UI |
| Regels | max 2, ±26 tekens per regel |
| Animatie | 90ms fade. Geen bounce, geen karaoke. |

Knip op ademhaling, niet op tekenaantal. De woord-timestamps uit Whisper geven
je de natuurlijke grenzen cadeau — gebruik ze.

---

## 7. Grade, export, caption

Grade: koel, contrastrijk, gecrushte zwarten, licht ontzadigd. Trek losse
clips naar de kleurtemperatuur van het dominante materiaal, niet andersom.
AI-shots komen te scherp en te verzadigd terug — zet ze **−4 saturatie** en
**−6 clarity** ónder het echte materiaal, dat verbergt de naad. Exacte waarden
in `references/ffmpeg.md`.

Export: H.264 High, CRF 24–26, maxrate 5–6M, `-movflags +faststart`,
AAC 192k/48kHz, **−14 LUFS / −1.0 dBTP**. Mik op **onder de 20MB** — TikTok
hercomprimeert toch, en grote bestanden zijn lastig te delen. Grain maakt
comprimeren duur; houd `noise=alls=5` of lager.

Caption: hook in de eerste regel (de rest kapt TikTok af), 7–9 hashtags in
drie lagen (niche → midden → breed), niche-tag vooraan. Lever 2–3 opties met
uitleg waarom, zodat de gebruiker kan kiezen op doel (bereik vs. merk).

---

## Referenties

- `references/ffmpeg.md` — alle filterstrings, ASS-stylesheet, grade, export
- `references/higgsfield.md` — identiteitsblok, negative prompt, shot-prompts
- `references/whisper-sandbox.md` — transcriptiecommando en polling
- `scripts/audit.sh` — footage-audit in één commando
