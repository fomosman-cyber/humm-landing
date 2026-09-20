# ffmpeg-recepten — kant-en-klaar

Alles 1080×1920, 30fps. Bouw per segment een los mp4 met identieke parameters,
plak daarna met de concat-demuxer.

## Inhoud
1. Grade
2. Encode-presets
3. Bewegingen (push-in, punch)
4. Effecten (glitch, shake, flash)
5. Titelkaart & end frame
6. Concat
7. ASS-ondertiteling
8. Finale pass & export

---

## 1. Grade

Koel, contrastrijk, gecrushte zwarten, licht ontzadigd, fijne korrel.

```bash
G="eq=contrast=1.12:saturation=0.88:brightness=-0.012:gamma=0.98,\
colorbalance=rs=-0.03:gs=-0.010:bs=0.05:rm=-0.02:bm=0.03:rh=-0.02:bh=0.02,\
curves=all='0/0.02 0.25/0.20 0.5/0.50 0.75/0.79 1/0.97',\
noise=alls=5:allf=t+u,format=yuv420p"
```

Voor **AI-shots** een aparte variant — iets vlakker en zachter, zodat ze ónder
het echte materiaal zitten en de naad wegvalt:

```bash
GA="eq=contrast=1.10:saturation=0.84:brightness=-0.012,\
colorbalance=rs=-0.03:bs=0.05,\
curves=all='0/0.02 0.25/0.20 0.5/0.50 0.75/0.79 1/0.97',\
unsharp=5:5:-0.3,noise=alls=5:allf=t+u,format=yuv420p"
```

`noise=alls=5` is het maximum dat nog goedkoop comprimeert. Hoger en je
bestandsgrootte loopt hard op terwijl niemand het ziet.

## 2. Encode-preset voor segmenten

```bash
E="-c:v libx264 -preset medium -crf 18 -r 30 -c:a aac -b:a 192k -ar 48000 -ac 2"
```

CRF 18 op segmenten, pas in de finale pass comprimeren. Twee keer zwaar
comprimeren stapelt artefacten.

## 3. Bewegingen

**Trage push-in** (N = aantal frames = duur × 30):

```bash
zoompan=z='min(1.0+0.055*on/N,1.055)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30
```

Pre-scale de bron iets groter (bv. `scale=1188:2112,crop=1080:1920`) zodat er
ruimte is om in te zoomen zonder te verzachten.

**Zoom punch** — begint ingezoomd, valt in 8 frames terug:

```bash
zoompan=z='if(lt(on,8),1.18-0.0225*on,1.0+0.03*(on-8)/127)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30
```

## 4. Effecten

Pas deze toe in de **finale pass** op de geplakte tijdlijn, met absolute
tijdcodes. Dat scheelt het herberekenen per segment.

**Chromatic glitch** op een snijpunt (2 frames):

```bash
rgbashift=rh=-16:bh=16:enable='between(t,10.99,11.06)',
rgbashift=rh=11:bh=-11:enable='between(t,11.06,11.12)'
```

**Camera shake** — pre-scale, dan crop met een sinus-offset die buiten het
venster nul is:

```bash
scale=1124:1998,crop=1080:1920:\
x='(iw-1080)/2 + if(between(t,21.69,22.00),11*sin(t*130),0)':\
y='(ih-1920)/2 + if(between(t,21.69,22.00),11*cos(t*160),0)'
```

Shake alleen als er iets ín beeld gebeurt. Ongemotiveerde shake leest als
template.

**Flash frames:**

```bash
drawbox=x=0:y=0:w=1080:h=1920:color=white@0.55:t=fill:enable='between(t,8.79,8.857)'
drawbox=x=0:y=0:w=1080:h=1920:color=black@0.85:t=fill:enable='between(t,24.96,24.99)'
```

**Vignette** op het hero-shot: `vignette=angle=PI/5`

## 5. Titelkaart & end frame

Fonts: `/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf`
(in de Higgsfield-sandbox: `liberation2/`).

`drawtext` kent geen letter-spacing — fake het met spaties: `2 0 2 6`.

**Titel** (over een bevroren frame met push-in):

```bash
drawbox=x=0:y=0:w=1080:h=1920:color=black@0.50:t=fill,
drawtext=fontfile=$F:text='HONDA CBR600RR':fontcolor=white:fontsize=78:\
  x=(w-text_w)/2:y=880:alpha='if(lt(t,0.25),t/0.25,1)',
drawtext=fontfile=$F:text='2 0 2 6':fontcolor=white@0.72:fontsize=46:x=(w-text_w)/2:y=1000,
drawbox=x=380:y=970:w=320:h=1:color=white@0.28:t=fill
```

**End frame** — laatste frame, geblurd en verdonkerd, tekst erover. Het gezicht
blijft vaag zichtbaar; de kijker vertrekt op de persoon, niet op een zwart vlak.

```bash
gblur=sigma=10,drawbox=x=0:y=0:w=1080:h=1920:color=black@0.60:t=fill,
drawtext=fontfile=$F:text='@iamhummrider':fontcolor=white:fontsize=96:\
  x=(w-text_w)/2:y=880:alpha='if(lt(t,0.27),t/0.27,1)',
drawbox=x=370:y=1012:w=340:h=1:color=white@0.25:t=fill,
drawtext=fontfile=$F:text='M E E R   R I T T E N .   M E E R   S N E L H E I D .':\
  fontcolor=white@0.65:fontsize=30:x=(w-text_w)/2:y=1046
```

Houd het end frame **2.5s** vast en laat de laatste 1.5s stil staan. Stilstand
leest als zelfvertrouwen; een end frame van 1s kost je de follow.

Subtiele branding tussendoor — één keer, 3 seconden, 42% wit:

```bash
drawtext=fontfile=$F:text='@iamhummrider':fontcolor=white@0.42:fontsize=30:\
  x=60:y=1430:enable='between(t,2.0,5.0)'
```

## 6. Concat

```bash
for f in S1 S2 S3 S4; do echo "file '$f.mp4'" >> cc.txt; done
ffmpeg -f concat -safe 0 -i cc.txt -c copy joined.mp4 -y
```

Stream-copy werkt alleen als alle segmenten identieke codec-parameters hebben.

## 7. ASS-ondertiteling

ASS boven SRT: exacte positionering, per-regel stijl, fades.
`MarginV = 1920 − gewenste_Y`. Voor Y≈1360 → `MarginV 560`.

```
[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Liberation Sans,62,&H00FFFFFF,&H00FFFFFF,&HB3000000,&H73000000,-1,0,0,0,100,100,0.6,0,1,3.4,2.6,2,90,90,560,1
Style: Big,Liberation Sans,70,&H00FFFFFF,&H00FFFFFF,&HB3000000,&H73000000,-1,0,0,0,100,100,0.6,0,1,3.6,2.6,2,90,90,560,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.70,0:00:01.30,Sub,,0,0,0,,{\fad(90,60)}Ik dacht: kom,
Dialogue: 0,0:00:01.30,0:00:02.64,Big,,0,0,0,,{\fad(90,80)}we gaan rijden man
```

Inbranden:

```bash
-vf "subtitles=subs.ass:fontsdir=/usr/share/fonts/truetype/liberation"
```

Staat de clip niet op t=0 in de tijdlijn, verschuif dan alle cues met de
offset van dat segment. Vergeet dat niet bij een AI-insert vooraan.

## 8. Finale pass & export

Effecten, branding, ondertiteling en loudness in één pass:

```bash
ffmpeg -i joined.mp4 -filter_complex \
"[0:v]<shake>,<glitches>,<flashes>,<branding>,subtitles=subs.ass:fontsdir=...[v];\
 [0:a]loudnorm=I=-14:TP=-1.0:LRA=11[a]" \
-map "[v]" -map "[a]" \
-c:v libx264 -profile:v high -preset slow -crf 24 -maxrate 6M -bufsize 12M \
-pix_fmt yuv420p -r 30 -g 60 -c:a aac -b:a 192k -ar 48000 -ac 2 \
-movflags +faststart final.mp4 -y
```

| Doel | CRF | maxrate | ± grootte (32s) |
|---|---|---|---|
| Archief | 19 | 18M | 42MB |
| Goede balans | 24 | 6M | 21MB |
| **Delen (aanrader)** | **25–26** | **4–5M** | **15–17MB** |

TikTok hercomprimeert alsnog naar ~2Mbps, dus hoger dan CRF 24 leveren heeft
weinig zin en maakt delen alleen lastiger.

## Audio-analyse (als transcriptie niet lukt)

Spraakgroepen uit de envelope halen, op 128ms resolutie:

```bash
ffmpeg -i audio.wav -af "astats=metadata=1:reset=12,\
ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-" -f null -
```

Pieken = spraak, dalen = pauzes. Dat geeft eerlijke cue-vensters om woorden in
te zetten, zonder iets te verzinnen.
