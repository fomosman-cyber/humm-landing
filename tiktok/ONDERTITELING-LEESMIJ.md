# Ondertiteling NL — hoe je dit in 1 minuut afmaakt

## Waarom de tekst leeg is
Ik kon hier geen transcriptie draaien: Hugging Face, de OpenAI-modelhost en
alphacephei zijn allemaal geblokkeerd door de netwerkpolicy van deze sessie,
en de Higgsfield video-analyse bleef in de wachtrij hangen. Jouw eigen regel
uit de briefing — *"Do NOT invent dialogue"* — geldt ook voor mij, dus ik heb
geen woorden verzonnen.

## Wat ik wel heb gedaan
De vier cue-vensters in `ondertiteling-NL.srt` zijn **niet geschat**. Ik heb een
RMS-envelope over de echte audio gedraaid op 128 ms resolutie en de vier
spraakgroepen eruit gehaald. De grenzen komen uit de golfvorm:

| Cue | In video | In clip | Energie |
|---|---|---|---|
| 1 | 0:01.00 – 0:02.75 | 0.30 – 2.05 | sterkst, piek −21 dB |
| 2 | 0:02.80 – 0:04.00 | 2.10 – 3.30 | aflopende staart |
| 3 | 0:04.35 – 0:05.65 | 3.65 – 4.95 | stijgend, tweede zin |
| 4 | 0:06.75 – 0:08.73 | 6.05 – 8.03 | slotzin, loopt tot de laatste frame |

Tussen 5.65 en 6.75 zit een stille plek (pauze of zachte tussenzin) — daar
hoort geen blokje.

## Zo maak je het af
1. Open `iamhummrider_TIKTOK.mp4` in CapCut.
2. Importeer `ondertiteling-NL.srt` (Ondertitels → Importeren).
3. Vervang de vier `[VUL IN]`-regels door wat je écht zegt. Laat de tijden staan.
4. Zet de stijl zoals hieronder.

**Let op cue 4:** die loopt tot 0:08.73 — de laatste frame van je clip. Laat
hem niet eerder afkappen, anders gaat precies het einde van je zin verloren.

## Stijl — exact instellen
| | |
|---|---|
| Lettertype | Inter / SF Pro / Helvetica — **Bold**, niet Black |
| Kleur | **#FFFFFF, 100%** — alleen wit |
| Rand | 3 px zwart, 70% |
| Schaduw | Y+3, blur 8, zwart 45% |
| Grootte | 62–68 px op 1080×1920 |
| Regels | max 2, ± 26 tekens per regel |
| Positie | gecentreerd, **onderkant tekst op Y = 1360 px** |
| Veilige zone | **niets onder Y = 1500 px** — daar zit de TikTok-UI |
| Animatie | 3 frames fade-in, geen bounce, geen karaoke |

Wil je dat ik ze schrijf en op de lettergreep uittimm? Stuur me gewoon de tekst
van wat je zegt, dan lever ik de ingebrande versie.
