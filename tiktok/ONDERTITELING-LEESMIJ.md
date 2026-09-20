# Ondertiteling NL — transcript en zekerheid

De ondertiteling zit **ingebrand** in beide video's. Dit bestand legt vast
wát er staat en hoe zeker dat is, zodat je het kunt corrigeren waar nodig.

## Hoe het gelukt is
Transcriptie kon niet in mijn eigen omgeving (Hugging Face en de andere
modelhosts zijn daar geblokkeerd door de netwerkpolicy). De Higgsfield
**sandbox** heeft wél faster-whisper én internet, dus ik heb je audio daar
door **Whisper large-v3** gehaald — twee keer: één keer op de ruwe audio en
één keer op een ontruiste versie. Beide gaven hetzelfde resultaat, wat het
betrouwbaar maakt.

## Wat je zegt

| # | Tijd in clip | Tekst |
|---|---|---|
| 1 | 0.00 – 1.94 | "Ik dacht, kom we gaan rijden man, **[onzeker]** man." |
| 2 | 2.66 – 5.42 | "Ik dacht, **slaap** lekker zo, heerlijk, heerlijk." |
| 3 | 5.46 – 7.82 | "Kom, kom, kom, we gaan rijden man, zonnetje schijnt, alles." |

## Twee dingen om te checken

**1. Het woord op 1.40–1.78.** Whisper hoort hier "fucken", maar met een
betrouwbaarheid van slechts **0.35–0.40** — veruit het onzekerste woord in de
hele clip. **Ik heb het niet in beeld gezet.** Twee redenen: het is te
onzeker om jou woorden in de mond te leggen, en een scheldwoord in beeld
drukt je bereik op TikTok. Je audio is onaangeroerd — alleen de ondertitel
slaat het over. Weet jij wat je daar zegt en wil je het erin? Zeg het en ik
zet het erbij.

**2. "slaap" op 3.24–3.80** heeft betrouwbaarheid **0.55–0.62** — de rest van
die zin zit op 0.97–1.00. Mogelijk is het "'t is lekker zo" of iets
vergelijkbaars. Luister die 0.6 seconde even terug.

Alle andere woorden zitten op **0.84–1.00**. "Zonnetje schijnt" is 0.96/0.78 —
dat klopt vrijwel zeker.

## Stijl zoals hij nu staat
Wit (#FFFFFF), Bold, 62px (70px op de twee nadruk-regels), zwarte rand 3.4px,
schaduw, gecentreerd, onderkant op Y≈1360px — ruim boven de TikTok-UI.
Fade-in van 90ms, geen bounce, geen karaoke.

Corrigeer je iets? Stuur de regel en ik render opnieuw.
