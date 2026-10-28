"""Generates the ZYLO app-icon SVGs. Render each to PNG with @resvg/resvg-js-cli."""

from pathlib import Path

INK = "#171717"
PAPER = "#FAF9F6"
ACCENT = "#68705A"
SIZE = 1024
OUT = Path(__file__).parent

# Geometric Z (bbox 292..732 x 282..742) plus a full-stop dot, optically centred.
Z = "M292 282H732V374L420 650H732V742H292V650L604 374H292Z"
DOT = (800, 696, 40)


def mark(scale: float, z_fill: str, dot_fill: str) -> str:
    cx, cy, r = DOT
    shift = -54  # centres the Z + dot group horizontally
    pivot = SIZE / 2
    return (
        f'<g transform="translate({pivot} {pivot}) scale({scale}) translate({-pivot + shift} {-pivot})">'
        f'<path d="{Z}" fill="{z_fill}"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot_fill}"/></g>'
    )


def svg(body: str) -> str:
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{SIZE}" height="{SIZE}" viewBox="0 0 {SIZE} {SIZE}">{body}</svg>\n'


files = {
    # Full-bleed icon (iOS, Expo, favicon source).
    "icon.svg": svg(f'<rect width="{SIZE}" height="{SIZE}" fill="{INK}"/>' + mark(1, PAPER, ACCENT)),
    # Android adaptive layers: keep the mark inside the 66% safe zone.
    "android-icon-foreground.svg": svg(mark(0.62, PAPER, ACCENT)),
    "android-icon-background.svg": svg(f'<rect width="{SIZE}" height="{SIZE}" fill="{INK}"/>'),
    "android-icon-monochrome.svg": svg(mark(0.62, "#FFFFFF", "#FFFFFF")),
    # Native splash logo on the paper background.
    "splash-icon.svg": svg(mark(1, INK, ACCENT)),
}

for name, content in files.items():
    (OUT / name).write_text(content)
