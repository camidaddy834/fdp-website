#!/usr/bin/env python3
"""
Generate the downloadable Capabilities Statement PDF.

    python3 scripts/gen-capabilities-pdf.py

Writes public/fdp-capabilities-statement.pdf. Keep the data below in sync with
CAPABILITIES / TEAM in src/data/company.ts. Needs fpdf2 (pip install fpdf2).
"""
import os
from fpdf import FPDF

# ---- Brand ----
NAVY = (30, 58, 99)        # #1e3a63
SILVER = (139, 149, 165)   # #8b95a5
INK = (26, 31, 38)
SOFT = (84, 94, 107)
LIGHT = (239, 242, 246)
LINE = (214, 219, 226)

# ---- Content (mirror of src/data/company.ts) ----
OVERVIEW = (
    "FDP is a professional food service facility design firm that combines "
    "multidisciplinary experience with cutting-edge technology and highly "
    "skilled professionals — serving diverse markets nationally and "
    "internationally. FDP is a closed Texas Limited Liability Company."
)
SECTORS = (
    "FDP is well qualified to perform any food service planning and design "
    "service. Our firm has been involved in diverse market projects nationally "
    "and internationally. Sectors include (but are not limited to) Government, "
    "Corporate, Health Care, Hospitality, Sports, Universities, K-12, Retail, "
    "Correctional, and Production Centers."
)
COMPETENCIES = [
    "Commercial & industrial food service",
    "New construction, renovations / expansions & temporary facilities",
    "District-wide assessments",
    "District standards",
    "Facility design guidelines",
    "Technical design guidelines",
    "Programming, schematic design, design development, construction documents & administration",
    "3D Enscape renderings & fly-throughs",
    "Revit software",
    "VR technology",
]
DATA = [
    ("Business Name", "Foodservice Design Professionals, LLC"),
    ("Legacy Since", "1967"),
    ("DUNS", "02153580"),
    ("UEID", "QUNELMMQ2SN9"),
    ("CAGE", "7YWH3"),
    ("Certifications", "WBE, WOSB, SBA, SBE, SDB & HUB"),
    ("NAICS", "541310 — Architectural Services"),
    ("SIC", "8712 — Architectural Services"),
    ("NIGP", "906-07 Architect Services; 918-52 Food Service Consulting"),
    ("UNSPSC", "82141505 — Computer Generated Design Services"),
]
LEADERS = [
    ("Melissa Moore, FCSI — Chief Executive Officer",
     "Melissa leads FDP with 17 years of design experience, 20+ years in the "
     "food service industry, and 30+ years of leadership. Based in South Texas, "
     "she designs, coordinates, and oversees projects for her team across the region."),
    ("Lance Brooks, FCSI — President",
     "Lance brings 24+ years of design experience and 30+ years in the food "
     "service industry. Based in North Texas, he designs, coordinates, and "
     "oversees projects for his team across the region."),
]
CUSTOMERS = [
    "DoDEA Pacific", "Lockheed Martin", "Jamaica House of Parliament",
    "American Airlines", "Baylor Medical Center", "Courtyard Marriott",
    "Grand Casino", "Independent School Districts", "Private Schools",
    "The Cotton Bowl Stadium", "University of Texas", "United Production Center",
    "Target", "Buc-ee's",
]
CONTACTS = [
    "Melissa Moore, FCSI, CEO  ·  594 Sawdust Rd, Suite 139, The Woodlands, TX 77380  ·  281.350.2323",
    "Lance Brooks, President  ·  584 N. Kimball Ave, Southlake, TX 76092  ·  972.245.5300",
]

M = 12.0  # margin mm


class PDF(FPDF):
    pass


def S(t):
    """Make text safe for the built-in (latin-1) Helvetica font."""
    return (
        t.replace("—", "-").replace("–", "-").replace("•", "-")
        .replace("’", "'").replace("‘", "'")
        .replace("“", '"').replace("”", '"')
    )


def heading(pdf, x, y, w, text):
    pdf.set_xy(x, y)
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.set_text_color(*NAVY)
    pdf.cell(w, 5, S(text.upper()))
    pdf.set_draw_color(*SILVER)
    pdf.set_line_width(0.5)
    pdf.line(x, y + 6, x + w, y + 6)
    return y + 9


def para(pdf, x, y, w, text, size=8.6, color=SOFT, lh=4.2):
    pdf.set_xy(x, y)
    pdf.set_font("Helvetica", "", size)
    pdf.set_text_color(*color)
    pdf.set_x(x)
    pdf.multi_cell(w, lh, S(text))
    return pdf.get_y()


def bullets(pdf, x, y, w, items, size=8.6, lh=4.3, gap=1.2):
    for it in items:
        # navy dot marker
        pdf.set_fill_color(*NAVY)
        pdf.ellipse(x + 0.4, y + lh / 2 - 0.5, 1.2, 1.2, "F")
        pdf.set_text_color(*INK)
        pdf.set_font("Helvetica", "", size)
        pdf.set_xy(x + 4.5, y)
        pdf.multi_cell(w - 4.5, lh, S(it))
        y = pdf.get_y() + gap
    return y


def build():
    pdf = PDF(format="Letter", unit="mm")
    pdf.set_auto_page_break(False)
    pdf.set_margins(M, M, M)
    pdf.add_page()
    W = pdf.w

    # ---- Header band ----
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, W, 28, "F")
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 30)
    pdf.set_xy(M, 6.5)
    pdf.cell(60, 14, "FDP")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(*SILVER)
    pdf.set_xy(M + 0.5, 19.5)
    pdf.cell(90, 4, "Food service facility design & consulting")
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_xy(W - M - 90, 8.5)
    pdf.cell(90, 8, "CAPABILITY STATEMENT", align="R")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(*SILVER)
    pdf.set_xy(W - M - 90, 17.5)
    pdf.cell(90, 5, "Foodservice Design Professionals, LLC", align="R")

    # ---- Two columns ----
    top = 34.0
    lx, lw = M, 112.0
    rx, rw = M + 120.0, W - M - (M + 120.0)

    # Left: overview + competencies
    y = heading(pdf, lx, top, lw, "Company Overview")
    y = para(pdf, lx, y, lw, OVERVIEW) + 2
    y = para(pdf, lx, y, lw, SECTORS) + 4
    y = heading(pdf, lx, y, lw, "Core Competencies")
    y_left = bullets(pdf, lx, y, lw, COMPETENCIES)

    # Right: company data box
    ry = heading(pdf, rx, top, rw, "Company Data")
    box_top = ry - 1
    pdf.set_fill_color(*LIGHT)
    # estimate box height after rendering rows; draw bg first with generous height
    # render rows measuring height
    rows_y = ry + 2
    pdf.set_draw_color(*LINE)
    # background
    # We'll compute height by simulating, but simpler: fixed row rendering then rect behind is hard.
    # Instead render rows, then draw a border around the block afterward.
    yy = rows_y
    for label, value in DATA:
        pdf.set_xy(rx + 3, yy)
        pdf.set_font("Helvetica", "B", 7.6)
        pdf.set_text_color(*NAVY)
        pdf.cell(rw - 6, 3.6, label.upper())
        yy += 3.6
        pdf.set_xy(rx + 3, yy)
        pdf.set_font("Helvetica", "", 8.4)
        pdf.set_text_color(*INK)
        pdf.multi_cell(rw - 6, 4.0, S(value))
        yy = pdf.get_y() + 2.0
    # border around data block
    pdf.set_draw_color(*LINE)
    pdf.set_line_width(0.3)
    pdf.rect(rx, box_top, rw, (yy - box_top) - 0.5)
    y_right = yy

    # ---- Leadership (full width) ----
    y = max(y_left, y_right) + 4
    y = heading(pdf, M, y, W - 2 * M, "Leadership")
    colw = (W - 2 * M - 8) / 2
    ytop = y
    ymax = y
    for i, (name, bio) in enumerate(LEADERS):
        cx = M + i * (colw + 8)
        pdf.set_xy(cx, ytop)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*INK)
        pdf.multi_cell(colw, 4.4, S(name))
        yb = pdf.get_y() + 0.5
        yb = para(pdf, cx, yb, colw, bio, size=8.2, lh=4.0)
        ymax = max(ymax, yb)
    y = ymax + 4

    # ---- Select customers ----
    y = heading(pdf, M, y, W - 2 * M, "Select Customers")
    ncol = 3
    cw = (W - 2 * M) / ncol
    per = (len(CUSTOMERS) + ncol - 1) // ncol
    start_y = y
    col_bottom = y
    for c in range(ncol):
        chunk = CUSTOMERS[c * per:(c + 1) * per]
        cy = bullets(pdf, M + c * cw, start_y, cw - 4, chunk, size=8.2, lh=4.2, gap=0.6)
        col_bottom = max(col_bottom, cy)
    y = col_bottom + 3

    # ---- Contact footer band ----
    fh = 16
    fy = pdf.h - fh
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, fy, W, fh, "F")
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 8.4)
    pdf.set_xy(M, fy + 2.4)
    pdf.cell(60, 4, "proposal@fdp.org   ·   www.fdp.org")
    pdf.set_font("Helvetica", "", 7.4)
    pdf.set_text_color(*SILVER)
    yy = fy + 6.6
    for line in CONTACTS:
        pdf.set_xy(M, yy)
        pdf.cell(W - 2 * M, 3.6, S(line))
        yy += 3.6

    out = os.path.join(os.path.dirname(__file__), "..", "public", "fdp-capabilities-statement.pdf")
    out = os.path.abspath(out)
    pdf.output(out)
    print("wrote", out)
    print("content bottom y:", round(y, 1), "mm (page", round(pdf.h, 1), "mm, footer at", round(fy, 1), ")")


if __name__ == "__main__":
    build()
