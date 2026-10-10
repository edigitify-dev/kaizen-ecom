"""Generates art-directed SVG placeholders in public/images.
Replace each file with real campaign photography (same file names, any format -> update lib/data.ts)."""
import os
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

SHAPES = {
 "model": '<ellipse cx="{cx}" cy="{hy}" rx="{hr}" ry="{hr1}" fill="#050505" opacity=".85"/><path d="M{l} {H} C{l} {sy} {a} {sy2} {cx} {sy2} C{b} {sy2} {r} {sy} {r} {H}Z" fill="#050505" opacity=".9"/>',
 "hoodie": '<path d="M{a} 22% L{b} 22% L{r} 70% L{r2} 70% L{r2} 78% L{b} 78% L{b} 86% L{a} 86% L{a} 78% L{l2} 78% L{l2} 70% L{l} 70%Z" fill="#101010" stroke="#2a2a28" stroke-width="2"/>',
 "pants": '<path d="M28% 14% L72% 14% L78% 92% L56% 92% L50% 40% L44% 92% L22% 92%Z" fill="#101010" stroke="#2a2a28" stroke-width="2"/>',
 "tee": '<path d="M30% 22% L42% 18% Q50% 26% 58% 18% L70% 22% L84% 40% L74% 48% L68% 42% L68% 84% L32% 84% L32% 42% L26% 48% L16% 40%Z" fill="#0f0f0f" stroke="#2a2a28" stroke-width="2"/>',
 "jacket": '<path d="M26% 20% L40% 15% Q50% 24% 60% 15% L74% 20% L88% 62% L76% 66% L70% 46% L70% 86% L30% 86% L30% 46% L24% 66% L12% 62%Z" fill="#0e0e0e" stroke="#33332f" stroke-width="2"/>',
 "macro": '<g stroke="#8d8b85" stroke-width="3" opacity=".7">'+"".join(f'<line x1="{44+ (i%2)*6}%" y1="{6+i*4.5}%" x2="{50+(i%2)*6}%" y2="{6+i*4.5}%"/>' for i in range(20))+'</g><rect x="46%" y="40%" width="8%" height="14%" rx="10" fill="#6d6b66"/>',
 "weave": '<g stroke="#2c2c29" stroke-width="1" opacity=".8">'+"".join(f'<line x1="0" y1="{i*14}" x2="100%" y2="{i*14}"/>' for i in range(60))+'</g>',
 "city": '<g fill="#121211" opacity=".9">'+"".join(f'<rect x="{x}%" y="{y}%" width="{w}%" height="{100-y}%"/>' for x,y,w in [(4,45,8),(14,30,7),(25,52,9),(60,38,8),(70,22,9),(82,48,7),(90,35,8)])+'</g>',
 "none": "",
}
def svg(name, w, h, kind="none", light=(.7,.3), tone="#5a5851", label="", sil=None):
    cx, cy = light
    body = ""
    if kind == "model":
        s = sil or (.55, .38, .12)
        cxp, hy, hr = int(w*s[0]), int(h*s[1]), int(w*s[2])
        body = SHAPES["model"].format(cx=cxp, hy=hy, hr=hr, hr1=int(hr*1.2), l=int(w*.1), r=int(w*1.05), a=int(w*.2), b=int(w*.9), sy=int(h*.62), sy2=int(h*.55), H=h)
    elif kind in ("hoodie", "pants", "tee", "jacket"):
        body = SHAPES[kind].format(a="30%", b="70%", l="12%", r="88%", l2="12%", r2="88%") if kind == "hoodie" else SHAPES[kind]
    else:
        body = SHAPES[kind]
    t = f'<text x="24" y="{h-24}" font-family="monospace" font-size="{max(11,w//70)}" letter-spacing="3" fill="#F0EDE5" opacity=".35">PLACEHOLDER · {label or name}</text>'
    open(os.path.join(OUT, name + ".svg"), "w").write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice">
<defs><radialGradient id="g" cx="{cx}" cy="{cy}" r=".9"><stop offset="0" stop-color="{tone}"/><stop offset=".55" stop-color="#1a1a18"/><stop offset="1" stop-color="#070707"/></radialGradient>
<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2"/><feColorMatrix type="saturate" values="0"/></filter></defs>
<rect width="100%" height="100%" fill="url(#g)"/>{body}<rect width="100%" height="100%" filter="url(#n)" opacity=".16"/>{t}</svg>''')

svg("hero", 1920, 1080, "model", (.72, .3), "#7a776e", "hero-model (oversized black jacket, low angle)", (.68, .36, .1))
svg("jacket", 1000, 1000, "jacket", (.5, .35), "#4b4944", "movement-jacket (cutout, transparent bg ideal)")
for n, k, tone in [("shadow-hoodie","hoodie","#3a3935"),("utility-cargo","pants","#3a3935"),("oversized-tee","tee","#3a3935"),("nylon-jacket","jacket","#3a3935")]:
    svg(n, 800, 1000, k, (.5,.3), tone, n); svg(n+"-alt", 800, 1000, k, (.3,.6), "#55534d", n+" (alt/back view)")
svg("minimalist", 900, 1200, "model", (.4,.3), "#6b685f", "collection-minimalist", (.5,.34,.11))
svg("after-hours", 900, 1200, "model", (.6,.25), "#77746a", "collection-after-hours", (.5,.4,.11))
svg("unconventional", 900, 1200, "model", (.5,.2), "#5d5b55", "collection-unconventional", (.55,.3,.1))
svg("macro-zipper", 1400, 1400, "macro", (.5,.4), "#6c6a64", "macro-zipper")
svg("textile", 800, 1000, "weave", (.3,.3), "#4a4843", "textile-closeup")
svg("stitch", 800, 1000, "weave", (.7,.7), "#4a4843", "stitching-detail")
svg("journal-1", 1600, 1000, "model", (.3,.3), "#8a8478", "journal-feature", (.55,.4,.09))
svg("journal-2", 900, 700, "city", (.5,.2), "#7d786d", "journal-2")
svg("journal-3", 900, 700, "city", (.2,.4), "#6f6b61", "journal-3")
svg("film-poster", 1600, 900, "model", (.5,.3), "#6a675f", "campaign-film-poster", (.5,.4,.08))
print("done")
