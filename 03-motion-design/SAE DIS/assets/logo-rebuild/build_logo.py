# Rebuild the SAE Malaysia logo as clean vector shapes, measured from the 472x233 brochure raster.
# Coordinates are in the raster's pixel space; the SVG scales freely.
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

out_dir = sys.argv[1]
BLUE = '#114B9B'

# --- stripes (shared by S, A, E) ---
STRIPES = [(112.8, 119.4), (126.2, 132.8), (139.6, 146.2), (153.0, 159.6)]

# --- S: solid upper body with the slit, measured contour ---
def catmull(pts):   # smooth curve through measured edge points (Catmull-Rom -> cubic Bezier)
    d = ''
    for i in range(len(pts) - 1):
        p0 = pts[max(i - 1, 0)]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[min(i + 2, len(pts) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6); c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {p2[0]:.2f},{p2[1]:.2f}'
    return d
# outer left edge of the S, top to bottom (measured: left edge of each row)
S_LEFT = [(63, 19), (54, 20.5), (47, 23.5), (41, 26.5), (36, 30.5), (31, 35), (28, 38.5), (25, 44), (23, 48.5), (22, 52.5),
          (21, 57), (20.2, 64), (20, 69), (20.8, 75), (22, 81), (23.2, 86), (25, 90.5), (27, 95), (29.8, 99.5), (35, 105.6)]
# lower lobe right edge, bottom to top, into the slit tip (measured: right edge + 1 of each row)
S_LOBE = [(162, 105.6), (161.5, 102), (160, 99), (159, 96), (157.5, 93), (155.5, 90), (153, 87), (150.5, 84.5), (147, 82),
          (144, 80.5), (139, 78.5), (132, 76.5), (124, 74.8), (114, 74), (106, 73.6)]
# smooth arcs fitted to the measured edge points above (a point-by-point spline shows the pixel steps)
S_BODY = ('M158,19 L63,19 C41.5,19 20,41.5 20,64 L20,70 C20,85 25,99 35,105.6 L162,105.6 '
          'C161.5,93 157,85 146,80.5 C136,76 122,73.6 107,73.6 C102.5,73.6 101.5,67 104.5,66.6 L158,66.6 Z')
# right edge of the S stripe block follows a rounded line (measured stripe ends)
S_CLIP = 'M24,110 L162.5,110 L162.5,121 C162,130 157,140 149,147 C143,152 136,157 128,161 L24,161 Z'

# --- A: triangle apex (232.5,15), sides slope 0.5506 px per px ---
def ax(y, side):
    return 232.5 + side * 0.5506 * (y - 15)
A_BODY = f'M232.5,15 L{ax(105.6,1):.2f},105.6 L{ax(105.6,-1):.2f},105.6 Z'
A_CLIP = f'M232.5,15 L{ax(161,1):.2f},161 L{ax(161,-1):.2f},161 Z'

# --- E: block with a notch on the right, measured ---
E_BODY = 'M319,21 L446,21 L446,66.6 L397,66.6 L397,74.6 L423,74.6 L423,105.6 L319,105.6 Z'
E_CLIP = 'M319,110 L450.5,110 L450.5,161 L319,161 Z'

def stripes(clip_id):
    return ''.join(f'<rect x="0" y="{a}" width="472" height="{b - a:.1f}" clip-path="url(#{clip_id})"/>' for a, b in STRIPES)

# --- MALAYSIA: Inter Black glyph outlines fitted to the measured letter boxes ---
font = TTFont('/usr/share/fonts/opentype/inter/Inter-Black.otf')
gs, cmap = font.getGlyphSet(), font.getBestCmap()
BOXES = [('M', 24, 55.5), ('A', 88, 117.5), ('L', 150, 171.5), ('A', 202, 232.5), ('Y', 259, 288.5),
         ('S', 318, 342.5), ('I', 377, 384.5), ('A', 418, 447.5)]
TOP, BASE = 177, 205.6
letters = []
for ch, x0, x1 in BOXES:
    g = gs[cmap[ord(ch)]]
    bp = BoundsPen(gs); g.draw(bp); bx0, by0, bx1, by1 = bp.bounds
    sy = (BASE - TOP) / (by1 - by0); sx = (x1 - x0) / (bx1 - bx0)
    pen = SVGPathPen(gs)
    # font units are y-up: flip, then fit the glyph's ink box to the measured box
    g.draw(TransformPen(pen, (sx, 0, 0, -sy, x0 - bx0 * sx, BASE + by0 * sy)))
    letters.append(f'<path d="{pen.getCommands()}"/>')
TEXT = ''.join(letters)

def svg(with_word, w=472, h=None, dark=False):
    h = h or (215 if with_word else 166)
    blue = '#FFFFFF' if dark else BLUE
    word = f'<g fill="{"#FFFFFF" if dark else "#000000"}">{TEXT}</g>' if with_word else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 8 {w - 12} {h - 8}">'
            '<defs>'
            f'<clipPath id="cs"><path d="{S_CLIP}"/></clipPath>'
            f'<clipPath id="ca"><path d="{A_CLIP}"/></clipPath>'
            f'<clipPath id="ce"><path d="{E_CLIP}"/></clipPath>'
            '</defs>'
            f'<g fill="{blue}">'
            f'<path id="S" d="{S_BODY}"/><g id="S-stripes">{stripes("cs")}</g>'
            f'<path id="A" d="{A_BODY}"/><g id="A-stripes">{stripes("ca")}</g>'
            f'<path id="E" d="{E_BODY}"/><g id="E-stripes">{stripes("ce")}</g>'
            f'</g>{word}</svg>')

for name, kw in [('sae-logo.svg', dict(with_word=True)), ('sae-logo-white.svg', dict(with_word=True, dark=True)),
                 ('sae-mark.svg', dict(with_word=False)), ('sae-mark-white.svg', dict(with_word=False, dark=True))]:
    open(f'{out_dir}/{name}', 'w').write(svg(**kw))
print('ok')
