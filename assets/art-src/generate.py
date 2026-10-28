#!/usr/bin/env python3
"""Generates ZYLO's original SVG illustrations (one file per asset) in this folder.

Design rules shared by every piece:
- palette: ivory / off-white / sand / stone / taupe / charcoal
- background: soft vertical gradient plus one large geometric motif (disc, arch or band)
- light from the upper left: every form uses the same lighten -> darken gradient
- outlines: 3px, a darker shade of the fill at 50% opacity; folds are 4px strokes at 18%
- items sit on a blurred contact shadow; subjects stay inside the central 70% so they crop safely

Render PNGs with:  npx @resvg/resvg-js-cli --fit-width <w> file.svg ../images/art/file.png
"""
import os

OUT = os.path.dirname(os.path.abspath(__file__))

PALETTE = dict(
    off="#FAF9F6", ivory="#F1EBDF", sand="#E6DCCB", stone="#D3CCC0",
    taupe="#A89886", deep="#7C6E5F", char="#34322F", ink="#171717",
)


def _rgb(h):
    h = h.lstrip("#")
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def mix(a, b, t):
    ra, rb = _rgb(a), _rgb(b)
    return "#%02x%02x%02x" % tuple(round(ra[i] + (rb[i] - ra[i]) * t) for i in range(3))


def lighter(c, t=0.35):
    return mix(c, "#ffffff", t)


def darker(c, t=0.35):
    return mix(c, "#000000", t)


class Art:
    def __init__(self, name, w, h, bg, motif="disc", motif_pos=(0.74, 0.28), motif_size=0.34):
        self.name, self.w, self.h = name, w, h
        self.defs, self.body = [], []
        self.n = 0
        top, bot = lighter(bg, 0.45), darker(bg, 0.07)
        self.defs.append(
            f'<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{top}"/>'
            f'<stop offset="1" stop-color="{bot}"/></linearGradient>'
        )
        self.defs.append('<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>')
        self.body.append(f'<rect width="{w}" height="{h}" fill="url(#bg)"/>')
        mc = lighter(bg, 0.55)
        if motif == "disc":
            self.body.append(f'<circle cx="{w*motif_pos[0]}" cy="{h*motif_pos[1]}" r="{w*motif_size}" fill="{mc}" fill-opacity="0.55"/>')
        elif motif == "arch":
            aw = w * motif_size * 2
            x0 = w * motif_pos[0] - aw / 2
            y0 = h * motif_pos[1]
            self.body.append(
                f'<path d="M{x0} {h} L{x0} {y0+aw/2} A{aw/2} {aw/2} 0 0 1 {x0+aw} {y0+aw/2} L{x0+aw} {h} Z" fill="{mc}" fill-opacity="0.5"/>'
            )
        elif motif == "band":
            self.body.append(f'<rect x="0" y="{h*motif_pos[1]}" width="{w}" height="{h*motif_size}" fill="{mc}" fill-opacity="0.45"/>')

    def shade(self, base):
        self.n += 1
        gid = f"g{self.n}"
        self.defs.append(
            f'<linearGradient id="{gid}" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="{lighter(base,0.22)}"/>'
            f'<stop offset="0.55" stop-color="{base}"/><stop offset="1" stop-color="{darker(base,0.22)}"/></linearGradient>'
        )
        return f"url(#{gid})"

    def shadow(self, cx, cy, rx, ry=26, op=0.22):
        self.body.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{PALETTE["ink"]}" fill-opacity="{op}" filter="url(#soft)"/>')

    def shape(self, d, base, outline=True, extra=""):
        stroke = f' stroke="{darker(base,0.4)}" stroke-opacity="0.5" stroke-width="3" stroke-linejoin="round"' if outline else ""
        self.body.append(f'<path d="{d}" fill="{self.shade(base)}"{stroke} {extra}/>')

    def fold(self, d, op=0.18, w=4, color=None):
        self.body.append(f'<path d="{d}" fill="none" stroke="{color or PALETTE["ink"]}" stroke-opacity="{op}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')

    def raw(self, s):
        self.body.append(s)

    def save(self):
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
               f'<defs>{"".join(self.defs)}</defs>{"".join(self.body)}</svg>')
        with open(os.path.join(OUT, self.name + ".svg"), "w") as f:
            f.write(svg)


P = PALETTE
W, H = 800, 1000  # product canvas, 4:5


# ---------- products ----------
def tshirt():
    a = Art("product-essential-tshirt", W, H, P["sand"], "disc", (0.72, 0.27))
    a.shadow(400, 805, 260)
    body = "M335 215 L215 255 L130 395 L222 445 L290 365 L290 760 Q400 782 510 760 L510 365 L578 445 L670 395 L585 255 L465 215 Q400 288 335 215 Z"
    a.shape(body, P["off"])
    a.fold("M290 365 Q280 410 286 460", 0.14); a.fold("M510 365 Q520 410 514 460", 0.14)
    a.fold("M325 670 Q400 692 475 670", 0.12); a.fold("M335 520 Q400 542 465 520", 0.1)
    a.raw(f'<path d="M335 215 Q400 288 465 215" fill="none" stroke="{P["stone"]}" stroke-width="16" stroke-linecap="round"/>')
    a.raw(f'<path d="M335 215 Q400 288 465 215" fill="none" stroke="{darker(P["stone"],0.3)}" stroke-opacity="0.35" stroke-width="2"/>')
    a.fold("M290 742 Q400 764 510 742", 0.2, 3)
    a.save()


def hoodie():
    a = Art("product-relaxed-hoodie", W, H, P["stone"], "arch", (0.7, 0.3), 0.3)
    a.shadow(400, 840, 260)
    body = "M325 250 L225 285 L165 640 L235 660 L285 430 L285 790 Q400 812 515 790 L515 430 L565 660 L635 640 L575 285 L475 250 Q400 290 325 250 Z"
    a.shape(body, P["char"])
    a.raw(f'<rect x="150" y="628" width="98" height="40" rx="8" transform="rotate(14 199 648)" fill="{darker(P["char"],0.15)}" stroke-opacity="0"/>')
    a.raw(f'<rect x="552" y="628" width="98" height="40" rx="8" transform="rotate(-14 601 648)" fill="{darker(P["char"],0.15)}"/>')
    a.fold("M300 760 Q400 785 500 760", 0.3, 4, "#000")
    a.shape("M330 595 L470 595 L505 725 L295 725 Z", darker(P["char"], 0.08))
    a.fold("M345 612 L455 612", 0.35, 3, "#fff")
    a.shape("M308 266 C292 138 508 138 492 266 Q400 338 308 266 Z", P["char"])
    a.shape("M336 246 C340 178 460 178 464 246 Q400 296 336 246 Z", darker(P["char"], 0.55), outline=False)
    a.raw(f'<path d="M372 300 L366 410 M428 300 L434 410" stroke="{P["ivory"]}" stroke-width="6" stroke-linecap="round"/>')
    a.raw(f'<circle cx="366" cy="414" r="6" fill="{P["ivory"]}"/><circle cx="434" cy="414" r="6" fill="{P["ivory"]}"/>')
    a.fold("M300 430 Q285 520 300 600", 0.22, 4, "#000")
    a.save()


def overshirt():
    a = Art("product-linen-overshirt", W, H, P["ivory"], "band", (0, 0.4), 0.28)
    a.shadow(400, 845, 270)
    body = "M326 238 L232 272 L158 700 L236 718 L290 440 L290 800 Q400 822 510 800 L510 440 L564 718 L642 700 L568 272 L474 238 L400 300 Z"
    base = P["taupe"]
    a.shape(body, base)
    a.fold("M290 440 Q276 560 286 680", 0.16); a.fold("M510 440 Q524 560 514 680", 0.16)
    a.fold("M340 620 Q380 640 392 700", 0.12); a.fold("M460 560 Q430 600 420 690", 0.12)
    a.raw(f'<path d="M400 300 L400 800" stroke="{darker(base,0.4)}" stroke-opacity="0.45" stroke-width="3"/>')
    for y in (350, 440, 530, 620, 710):
        a.raw(f'<circle cx="400" cy="{y}" r="8" fill="{P["ivory"]}" stroke="{darker(base,0.4)}" stroke-opacity="0.5" stroke-width="2"/>')
    a.shape("M330 240 L398 290 L368 334 L314 272 Z", lighter(base, 0.2))
    a.shape("M470 240 L402 290 L432 334 L486 272 Z", lighter(base, 0.12))
    for x in (320, 424):
        a.shape(f"M{x} 450 L{x+60} 450 L{x+60} 515 L{x+30} 530 L{x} 515 Z", darker(base, 0.05))
    a.fold("M236 718 L158 700", 0.3, 5)
    a.save()


def shoe(name, bg, upper, accent, sole, flip=False, perforated=False, motif="disc"):
    a = Art(name, W, H, bg, motif, (0.28 if flip else 0.72, 0.3))
    a.shadow(400, 715, 300, 22)
    parts = Art("tmp", W, H, bg)
    parts.n = 100  # keep gradient ids distinct from the stage's
    p = parts
    # midsole + outsole
    p.shape("M104 640 L696 640 Q724 640 722 668 Q718 706 686 706 L136 706 Q104 706 102 676 Z", sole)
    p.raw(f'<path d="M110 688 L712 688" stroke="{darker(sole,0.35)}" stroke-opacity="0.3" stroke-width="3"/>')
    # upper
    p.shape("M122 642 C112 540 122 440 152 396 Q180 372 222 380 C258 388 276 428 320 440 C390 456 440 476 490 498 C590 530 690 566 706 642 Z", upper)
    # side panel band
    p.shape("M128 600 C150 560 230 540 330 560 C430 580 520 600 640 628 L700 640 L130 640 Z", accent, outline=False)
    # heel counter
    p.shape("M122 642 C112 540 120 448 150 400 L196 392 C182 470 188 560 200 642 Z", darker(accent, 0.1))
    # tongue
    p.shape("M282 424 C290 352 356 336 384 362 C382 398 362 434 340 452 Z", lighter(upper, 0.06))
    # laces
    for (x, y) in [(352, 458), (386, 470), (420, 484), (454, 498)]:
        p.raw(f'<path d="M{x-26} {y-30} L{x+16} {y+14}" stroke="{darker(upper,0.45)}" stroke-opacity="0.7" stroke-width="8" stroke-linecap="round"/>')
    # toe cap
    p.shape("M560 534 C640 556 700 590 706 642 L600 642 C600 600 584 560 560 534 Z", lighter(upper, 0.04), outline=True)
    if perforated:
        for i in range(3):
            for j in range(2):
                p.raw(f'<circle cx="{636+i*17}" cy="{600+j*17-i*7}" r="4.4" fill="{darker(upper,0.45)}" fill-opacity="0.5"/>')
    flip_tr = f"translate({W} 0) scale(-1 1) " if flip else ""
    a.defs.extend(parts.defs[2:])
    a.body.append(f'<g transform="{flip_tr}translate(400 560) scale(1.12) translate(-400 -560)">' + "".join(parts.body[2:]) + "</g>")
    a.save()


def watch():
    a = Art("product-classic-watch", W, H, P["ivory"], "disc", (0.3, 0.3), 0.3)
    a.shadow(400, 905, 140, 18, 0.18)
    strap = P["deep"]
    a.shape("M330 110 Q400 90 470 110 L452 392 L348 392 Z", strap)
    a.shape("M348 610 L452 610 L476 880 Q400 900 324 880 Z", strap)
    for y in (700, 740, 780, 820):
        a.raw(f'<circle cx="400" cy="{y}" r="9" fill="{darker(strap,0.5)}" fill-opacity="0.6"/>')
    a.fold("M352 150 L362 370", 0.25, 3, "#fff"); a.fold("M448 150 L438 370", 0.2, 3, "#000")
    a.raw(f'<rect x="548" y="478" width="34" height="44" rx="8" fill="{P["taupe"]}" stroke="{darker(P["taupe"],0.4)}" stroke-opacity="0.5" stroke-width="3"/>')
    steel = "#C9C4BA"
    a.n += 1; gid = f"g{a.n}"
    a.defs.append(f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3F0EA"/><stop offset="0.5" stop-color="{steel}"/><stop offset="1" stop-color="#8E897F"/></linearGradient>')
    a.raw(f'<circle cx="400" cy="500" r="168" fill="url(#{gid})" stroke="{darker(steel,0.4)}" stroke-opacity="0.5" stroke-width="3"/>')
    a.raw(f'<circle cx="400" cy="500" r="140" fill="{P["off"]}" stroke="{darker(steel,0.45)}" stroke-opacity="0.5" stroke-width="3"/>')
    import math
    for k in range(12):
        ang = math.radians(k * 30 - 90)
        r1, r2 = (118, 132) if k % 3 == 0 else (124, 132)
        wdt = 6 if k % 3 == 0 else 3
        a.raw(f'<path d="M{400+r1*math.cos(ang):.1f} {500+r1*math.sin(ang):.1f} L{400+r2*math.cos(ang):.1f} {500+r2*math.sin(ang):.1f}" stroke="{P["char"]}" stroke-width="{wdt}" stroke-linecap="round"/>')
    a.raw(f'<path d="M400 500 L400 410" stroke="{P["char"]}" stroke-width="9" stroke-linecap="round"/>')
    a.raw(f'<path d="M400 500 L466 538" stroke="{P["char"]}" stroke-width="9" stroke-linecap="round"/>')
    a.raw(f'<path d="M400 500 L350 566" stroke="{P["taupe"]}" stroke-width="3" stroke-linecap="round"/>')
    a.raw(f'<circle cx="400" cy="500" r="9" fill="{P["char"]}"/>')
    a.raw(f'<path d="M300 400 A130 130 0 0 1 380 372" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="6" stroke-linecap="round"/>')
    a.save()


def tote():
    a = Art("product-canvas-tote", W, H, P["stone"], "arch", (0.3, 0.32), 0.28)
    a.shadow(400, 868, 250)
    canvas = "#D8C9AE"
    a.raw(f'<path d="M300 420 C300 230 500 230 500 420" fill="none" stroke="{darker(P["deep"],0.1)}" stroke-width="26" stroke-linecap="round" stroke-opacity="0.55"/>')
    a.shape("M215 405 L585 405 L610 850 Q400 872 190 850 Z", canvas)
    a.shape("M215 405 L585 405 L590 470 L210 470 Z", darker(canvas, 0.06))
    a.fold("M214 470 L590 470", 0.2, 3)
    a.fold("M250 600 Q400 640 560 600", 0.1); a.fold("M240 720 Q400 760 570 720", 0.1)
    a.raw(f'<path d="M318 420 C318 260 482 260 482 420" fill="none" stroke="{P["deep"]}" stroke-width="30" stroke-linecap="round"/>')
    a.raw(f'<path d="M318 420 C318 260 482 260 482 420" fill="none" stroke="{lighter(P["deep"],0.3)}" stroke-opacity="0.5" stroke-width="5" stroke-linecap="round" transform="translate(-6 -4)"/>')
    a.raw(f'<rect x="312" y="398" width="22" height="58" rx="6" fill="{darker(P["deep"],0.15)}"/><rect x="466" y="398" width="22" height="58" rx="6" fill="{darker(P["deep"],0.15)}"/>')
    a.raw(f'<rect x="340" y="560" width="120" height="120" rx="6" fill="none" stroke="{P["char"]}" stroke-opacity="0.55" stroke-width="4"/>')
    a.raw(f'<circle cx="400" cy="620" r="26" fill="none" stroke="{P["char"]}" stroke-opacity="0.55" stroke-width="4"/>')
    a.raw(f'<path d="M388 632 L412 608" stroke="{P["char"]}" stroke-opacity="0.55" stroke-width="4" stroke-linecap="round"/>')
    a.save()


def belt():
    a = Art("product-leather-belt", W, H, P["stone"], "band", (0, 0.32), 0.36)
    a.shadow(400, 800, 260, 24)
    leather = P["deep"]
    a.n += 1; gid = f"g{a.n}"
    a.defs.append(f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{lighter(leather,0.25)}"/><stop offset="1" stop-color="{darker(leather,0.3)}"/></linearGradient>')
    a.raw(f'<circle cx="400" cy="500" r="238" fill="none" stroke="{darker(leather,0.45)}" stroke-opacity="0.5" stroke-width="82"/>')
    a.raw(f'<circle cx="400" cy="500" r="238" fill="none" stroke="url(#{gid})" stroke-width="76"/>')
    a.raw(f'<circle cx="400" cy="500" r="238" fill="none" stroke="{P["ivory"]}" stroke-opacity="0.55" stroke-width="3" stroke-dasharray="14 11" transform="rotate(8 400 500)" stroke-linecap="round" style="mix-blend-mode:normal"/>')
    a.raw(f'<circle cx="400" cy="500" r="213" fill="none" stroke="{darker(leather,0.4)}" stroke-opacity="0.3" stroke-width="2"/>')
    import math
    for k in range(7):
        ang = math.radians(150 + k * 9)
        a.raw(f'<circle cx="{400+238*math.cos(ang):.1f}" cy="{500+238*math.sin(ang):.1f}" r="7" fill="{darker(leather,0.6)}" fill-opacity="0.8"/>')
    # buckle at right
    steel = "#CFCAC0"
    a.raw(f'<g transform="rotate(-6 638 500)"><rect x="596" y="418" width="92" height="164" rx="12" fill="none" stroke="{steel}" stroke-width="20"/>'
          f'<rect x="596" y="418" width="92" height="164" rx="12" fill="none" stroke="{darker(steel,0.4)}" stroke-opacity="0.45" stroke-width="3"/>'
          f'<path d="M604 500 L668 500" stroke="{darker(steel,0.2)}" stroke-width="10" stroke-linecap="round"/></g>')
    a.save()


# ---------- hero ----------
def hero():
    w, h = 1000, 1300
    a = Art("hero-campaign", w, h, P["sand"], "arch", (0.5, 0.2), 0.36)
    a.raw(f'<circle cx="720" cy="360" r="150" fill="{P["off"]}" fill-opacity="0.75"/>')
    a.raw(f'<rect x="0" y="1160" width="{w}" height="140" fill="{darker(P["sand"],0.16)}" fill-opacity="0.55"/>')
    a.shadow(500, 1215, 250, 24, 0.28)
    skin = "#B79F89"
    a.raw('<g transform="translate(500 1230) scale(1.12) translate(-500 -1230)">')
    # legs
    a.shape("M392 960 L498 960 L488 1200 L388 1200 Z", P["char"]); a.shape("M502 960 L608 960 L612 1200 L512 1200 Z", P["char"])
    a.raw(f'<ellipse cx="438" cy="1212" rx="62" ry="16" fill="{P["ink"]}"/><ellipse cx="562" cy="1212" rx="62" ry="16" fill="{P["ink"]}"/>')
    # sleeves + hands
    a.shape("M386 430 L322 870 L386 884 L428 520 Z", P["char"]); a.shape("M614 430 L678 870 L614 884 L572 520 Z", P["char"])
    a.raw(f'<ellipse cx="356" cy="898" rx="26" ry="34" fill="{skin}"/><ellipse cx="644" cy="898" rx="26" ry="34" fill="{skin}"/>')
    # coat
    a.shape("M380 428 Q500 392 620 428 L664 1010 Q500 1040 336 1010 Z", P["char"])
    a.fold("M420 520 Q412 760 396 1000", 0.3, 4, "#000"); a.fold("M580 520 Q588 760 604 1000", 0.3, 4, "#000")
    # shirt + lapels
    a.shape("M462 410 L500 600 L538 410 Z", P["off"])
    a.shape("M444 414 L500 690 L420 470 Z", lighter(P["char"], 0.1)); a.shape("M556 414 L500 690 L580 470 Z", lighter(P["char"], 0.06))
    a.raw(f'<rect x="352" y="720" width="296" height="26" fill="{darker(P["char"],0.4)}"/><rect x="480" y="716" width="40" height="34" rx="4" fill="none" stroke="{P["taupe"]}" stroke-width="5"/>')
    # neck + head + hair
    a.raw(f'<rect x="476" y="352" width="48" height="64" fill="{darker(skin,0.1)}"/>')
    a.raw(f'<ellipse cx="500" cy="296" rx="56" ry="72" fill="{skin}"/>')
    a.raw(f'<path d="M442 290 C436 214 470 212 506 214 C548 214 566 240 558 292 C546 256 520 246 494 250 C470 254 452 268 442 290 Z" fill="{P["ink"]}"/>')
    a.raw(f'<path d="M442 290 C440 330 452 352 470 360" fill="none" stroke="{P["ink"]}" stroke-width="14" stroke-linecap="round"/>')
    a.raw("</g>")
    a.save()


# ---------- collections ----------
CW, CH = 800, 1100


def knitwear():
    a = Art("collection-knitwear", CW, CH, P["ivory"], "disc", (0.7, 0.26), 0.3)
    a.shadow(400, 800, 290)
    for i, (y, col, x0) in enumerate([(650, P["char"], 150), (520, P["taupe"], 170), (390, P["off"], 150)]):
        body = f"M{x0+20} {y} Q{x0+20} {y-30} {x0+80} {y-32} L{x0+420} {y-32} Q{x0+480} {y-30} {x0+480} {y} L{x0+500} {y+110} Q{x0+500} {y+140} {x0+470} {y+140} L{x0+30} {y+140} Q{x0} {y+140} {x0} {y+110} Z"
        a.shape(body, col)
        a.shape(f"M{x0+2} {y+104} L{x0+498} {y+104} L{x0+498} {y+118} Q{x0+498} {y+138} {x0+470} {y+138} L{x0+30} {y+138} Q{x0+2} {y+138} {x0+2} {y+118} Z", darker(col, 0.06))
        for k in range(1, 24):
            xx = x0 + 4 + k * 20.8
            a.fold(f"M{xx} {y+106} L{xx} {y+136}", 0.16, 2)
        a.fold(f"M{x0+120} {y-24} Q{x0+170} {y+40} {x0+130} {y+100}", 0.16, 4)
    a.save()


def weekend():
    a = Art("collection-weekend", CW, CH, P["stone"], "arch", (0.3, 0.2), 0.3)
    a.shadow(400, 820, 280)
    # folded trousers stack
    chino = P["sand"]
    a.shape("M190 560 L610 560 Q630 560 630 580 L630 770 Q630 800 600 800 L200 800 Q170 800 170 770 L170 580 Q170 560 190 560 Z", darker(chino, 0.06))
    a.shape("M190 560 L610 560 Q630 560 630 580 L630 626 L170 626 L170 580 Q170 560 190 560 Z", chino)
    for y in (690, 752):
        a.fold(f"M172 {y} L628 {y}", 0.22, 3)
    for x in (270, 400, 530):
        a.raw(f'<rect x="{x-10}" y="560" width="20" height="66" fill="{darker(chino,0.12)}" fill-opacity="0.7"/>')
    a.raw(f'<circle cx="400" cy="600" r="9" fill="{P["deep"]}"/>')
    a.fold("M200 640 L200 790", 0.12, 3); a.fold("M600 640 L600 790", 0.12, 3)
    # sunglasses
    fr = P["char"]
    for cx in (290, 510):
        a.raw(f'<circle cx="{cx}" cy="400" r="86" fill="{P["ink"]}" fill-opacity="0.82" stroke="{fr}" stroke-width="16"/>')
        a.raw(f'<path d="M{cx-52} {360} A64 64 0 0 1 {cx-8} {332}" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="7" stroke-linecap="round"/>')
    a.raw(f'<path d="M376 392 Q400 368 424 392" fill="none" stroke="{fr}" stroke-width="14" stroke-linecap="round"/>')
    a.raw(f'<path d="M204 392 L130 420 M596 392 L670 420" stroke="{fr}" stroke-width="14" stroke-linecap="round"/>')
    a.save()


def outerwear():
    a = Art("collection-outerwear", CW, CH, P["stone"], "disc", (0.3, 0.3), 0.32)
    a.shadow(400, 905, 200, 20, 0.15)
    coat = P["char"]
    a.raw(f'<path d="M400 160 L400 215" stroke="{P["deep"]}" stroke-width="10" stroke-linecap="round"/>')
    a.raw(f'<path d="M400 160 C400 120 450 120 450 158" fill="none" stroke="{P["deep"]}" stroke-width="10" stroke-linecap="round"/>')
    a.raw(f'<path d="M262 285 Q400 205 538 285" fill="none" stroke="{P["deep"]}" stroke-width="12" stroke-linecap="round"/>')
    a.shape("M338 280 Q400 250 462 280 L520 300 L560 700 L585 900 Q400 925 215 900 L240 700 L280 300 Z", coat)
    a.shape("M280 300 L215 700 L262 710 L330 400 Z", coat); a.shape("M520 300 L585 700 L538 710 L470 400 Z", coat)
    a.shape("M368 275 L400 560 L432 275 Z", P["off"])
    a.shape("M340 282 L402 620 L318 420 Z", lighter(coat, 0.12)); a.shape("M460 282 L398 620 L482 420 Z", lighter(coat, 0.08))
    a.raw(f'<rect x="262" y="640" width="276" height="22" fill="{darker(coat,0.45)}"/>')
    for y in (700, 770):
        a.raw(f'<circle cx="400" cy="{y}" r="9" fill="{P["taupe"]}" stroke="#000" stroke-opacity="0.3" stroke-width="2"/>')
    a.fold("M300 420 Q285 640 262 880", 0.28, 4, "#000"); a.fold("M500 420 Q515 640 538 880", 0.28, 4, "#000")
    a.save()


def studio():
    a = Art("collection-studio", CW, CH, P["sand"], "arch", (0.5, 0.12), 0.38)
    a.raw(f'<rect x="90" y="250" width="620" height="14" rx="7" fill="{P["char"]}"/>')
    a.raw(f'<rect x="90" y="250" width="14" height="560" fill="{P["char"]}" fill-opacity="0.9"/><rect x="696" y="250" width="14" height="560" fill="{P["char"]}" fill-opacity="0.9"/>')
    a.shadow(400, 840, 330, 18, 0.18)
    items = [(210, P["off"], 300, 1.0), (400, P["taupe"], 260, 1.15), (590, P["char"], 300, 1.0)]
    for cx, col, hh, s in items:
        a.raw(f'<path d="M{cx} 264 L{cx} 292" stroke="{P["deep"]}" stroke-width="7" stroke-linecap="round"/>')
        a.raw(f'<path d="M{cx} 292 L{cx-70} 336 M{cx} 292 L{cx+70} 336" stroke="{P["deep"]}" stroke-width="7" stroke-linecap="round"/>')
        top = 330
        a.shape(f"M{cx-76} {top} Q{cx} {top-12} {cx+76} {top} L{cx+116} {top+30} L{cx+98} {top+hh*0.5} L{cx+64} {top+hh*0.4} L{cx+64} {top+hh*1.9} L{cx-64} {top+hh*1.9} L{cx-64} {top+hh*0.4} L{cx-98} {top+hh*0.5} L{cx-116} {top+30} Z", col)
        a.fold(f"M{cx-40} {top+hh*0.6} Q{cx-34} {top+hh*1.2} {cx-40} {top+hh*1.7}", 0.15)
    a.save()


for fn in (tshirt, hoodie, overshirt, watch, tote, belt, hero, knitwear, weekend, outerwear, studio):
    fn()
shoe("product-everyday-sneakers", P["stone"], P["off"], P["char"], P["ivory"], flip=False)
shoe("product-court-trainers", P["sand"], P["ivory"], P["taupe"], P["off"], flip=True, perforated=True, motif="band")
print("ok")
