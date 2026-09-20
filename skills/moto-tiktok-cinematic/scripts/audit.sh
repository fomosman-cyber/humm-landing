#!/usr/bin/env bash
# Footage-audit: draai dit VOORDAT je een tijdlijn bedenkt.
# Gebruik: bash audit.sh <map-met-clips> [uitvoermap]
#
# Let op: elke ffmpeg/ffprobe krijgt -nostdin. Zonder dat slurpt ffmpeg de
# bestandenlijst van de loop op en stopt het script na de eerste clip.
set -uo pipefail

SRC="${1:?Geef de map met clips op}"
OUT="${2:-./audit}"
mkdir -p "$OUT/frames"

command -v ffprobe >/dev/null || { echo "ffmpeg/ffprobe ontbreekt. apt-get install -y ffmpeg"; exit 1; }

mapfile -t FILES < <(find "$SRC" -maxdepth 1 -type f \( -iname '*.mov' -o -iname '*.mp4' -o -iname '*.m4v' \) | sort)

echo "############ BESTANDEN ############"
ls -la "$SRC"
echo
echo "Aantal videobestanden: ${#FILES[@]}"
echo "  -> Klopt dit met wat de gebruiker zei te sturen? Zo niet: meld het NU."
echo

i=0
for f in "${FILES[@]}"; do
  i=$((i+1)); B=$(basename "$f")
  echo "############ [$i/${#FILES[@]}] $B ############"

  ffprobe -v error -show_entries format=duration,size,bit_rate \
          -show_entries stream=index,codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels \
          -of default=noprint_wrappers=0 "$f" 2>/dev/null

  ROT=$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation \
        -of csv=p=0 "$f" 2>/dev/null | tr -d '\n ' | sed 's/^,*//;s/,*$//')
  echo ">> ROTATIE: ${ROT:-geen}"
  if [ -n "$ROT" ]; then
    echo "   LET OP: opgeslagen liggend maar toont staand."
    echo "   Getoonde maten: $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f" 2>/dev/null | awk -F, '{print $2"x"$1}')"
  fi

  ffprobe -v error -show_entries format_tags=com.apple.quicktime.creationdate,com.apple.quicktime.model,com.apple.quicktime.location.ISO6709 \
          -of default=noprint_wrappers=1 "$f" 2>/dev/null | grep -v '^\[' || true

  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null)
  # Max 16 frames per clip: genoeg om de inhoud te beoordelen, snel genoeg op HEVC.
  read -r FPS COLS < <(python3 -c "
import math
d=float('${DUR:-8}') or 8.0
n=max(4,min(16,int(d)))
print(f'{n/d:.4f}', min(4,math.ceil(math.sqrt(n))))
" 2>/dev/null || echo "1 4")

  echo ">> frames extraheren (~${DUR%.*}s)..."
  ffmpeg -nostdin -v error -i "$f" -vf "fps=${FPS},scale=260:-1" -frames:v 16 \
         "$OUT/frames/c${i}_%02d.jpg" -y 2>/dev/null

  ffmpeg -nostdin -v error -pattern_type glob -i "$OUT/frames/c${i}_*.jpg" \
         -filter_complex "tile=${COLS}x${COLS}:padding=6:color=#222222" \
         -frames:v 1 "$OUT/sheet_${i}.jpg" -y 2>/dev/null

  echo ">> AUDIO:"
  ffmpeg -nostdin -i "$f" -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume" || echo "   geen audiospoor"
  echo
done

echo "############ KLAAR ############"
ls -la "$OUT"/sheet_*.jpg 2>/dev/null
cat <<'NOTE'

BEKIJK DE CONTACTVELLEN NU ECHT met de Read-tool. Controleer:
  - klopt de inhoud met wat de gebruiker beschreef?
  - staat overal dezelfde motor in beeld?
  - merkrisico's (sigaretten, logo's, kentekens)?
  - waar zit beweging, en waar is het statisch?
Meld afwijkingen voordat je een tijdlijn bouwt.
NOTE
