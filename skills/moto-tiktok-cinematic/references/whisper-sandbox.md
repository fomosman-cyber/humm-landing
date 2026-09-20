# Transcriptie via de Higgsfield-sandbox

## Waarom deze omweg

In deze omgeving zijn Hugging Face, `openaipublic.azureedge.net` en
alphacephei geblokkeerd door de netwerkpolicy. `pip install faster-whisper`
lukt wel (pypi is open), maar het modelgewicht downloaden niet — dus lokaal
transcriberen is onmogelijk.

De **Higgsfield-sandbox heeft faster-whisper voorgeïnstalleerd én internet**.
Daar draait het gewoon.

## Belangrijk over de sandbox

- Wordt **~10s na een call weggegooid**. Bestanden overleven alleen tussen
  direct opeenvolgende calls.
- `background: true` geeft een **lease van 15 minuten** — gebruik dat voor
  modeldownload + transcriptie, en poll daarna het `.exit`-bestand.
- De MCP-call zelf time-out na 60s. Poll dus in korte calls; de
  achtergrondtaak loopt door.
- Ketting alles in één commando met `&&`.

## Het commando

```
mcp__Higsfield__sandbox_exec  (background: true)
```

```bash
cd /home/user && curl -sS -o clip.mp4 "<media-url van de input-CDN>" && \
ffmpeg -v error -i clip.mp4 -af "highpass=f=80,afftdn=nr=10:nf=-28,dynaudnorm" \
  -ar 16000 -ac 1 clean.wav -y && \
python3 -c "
from faster_whisper import WhisperModel
import json
m = WhisperModel('large-v3', device='cpu', compute_type='int8')
res={}
for tag,src in [('raw','clip.mp4'),('clean','clean.wav')]:
    segs, info = m.transcribe(src, language='nl', beam_size=5,
                              word_timestamps=True, vad_filter=False,
                              condition_on_previous_text=False)
    res[tag]=[{'s':round(s.start,2),'e':round(s.end,2),'t':s.text.strip(),
               'w':[{'s':round(w.start,2),'e':round(w.end,2),'w':w.word,
                     'p':round(w.probability,2)} for w in (s.words or [])]}
              for s in segs]
json.dump(res, open('nl.json','w'), ensure_ascii=False, indent=1)
print('DONE')
"
```

Pollen:

```bash
cd /home/user && for i in $(seq 1 11); do
  [ -f .bg/<id>.exit ] && { echo "EXIT=$(cat .bg/<id>.exit)"; break; }
  sleep 10
done; tail -5 .bg/<id>.log
```

## Waarom twee keer draaien

Eén keer op ruwe audio, één keer op ontruiste audio. **Komen ze overeen, dan
is het betrouwbaar.** Verschillen ze, dan weet je precies waar je moet
terugluisteren. Bij buitenopnames met wind is dat het verschil tussen een
transcript dat je durft te gebruiken en een gok.

`large-v3` is de moeite waard boven `small`: in de praktijk verbeterde het
"je schijt alles" naar "zonnetje schijnt, alles" — een zin die pas mét het
grote model klopte.

## Omgaan met betrouwbaarheid

Elk woord krijgt `p` (0–1). Gebruik dat:

| `p` | Doen |
|---|---|
| > 0.8 | plaatsen |
| 0.5 – 0.8 | plaatsen, maar in de leesmij aangeven dat het gecheckt moet worden |
| < 0.5 | **niet plaatsen** |

Onder 0.5 niet plaatsen is geen preutsheid maar nauwkeurigheid: een gegokt
woord in beeld legt de gebruiker woorden in de mond die hij niet zei. Bij een
scheldwoord kost het bovendien bereik op TikTok. Laat het weg, **houd de audio
onaangeroerd**, en meld precies wat je oversloeg, met de score erbij, zodat de
gebruiker het kan beoordelen.

Lever altijd een leesmij met de betrouwbaarheid per regel. De gebruiker kan
dan gericht 0.6 seconde terugluisteren in plaats van de hele clip.

## Als het helemaal niet lukt

Verzin geen dialoog. Meet in plaats daarvan de spraakgroepen uit de
audio-envelope (`astats`, 128ms) en lever lege cue-vensters met exacte tijden.
Dat is eerlijk, en de gebruiker vult het in een minuut in CapCut in.
