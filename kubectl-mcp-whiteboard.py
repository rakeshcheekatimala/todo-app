#!/usr/bin/env python3
"""
Generate a whiteboard-style diagram for kubectl-mcp server
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create a large canvas (whiteboard-like)
width, height = 2800, 2000
img = Image.new('RGB', (width, height), color='#F5F5DC')  # Beige/cream whiteboard color
draw = ImageDraw.Draw(img)

# Try to use a nice font, fallback to default if not available
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 56)
    header_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
    body_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 26)
    small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 22)
    caption_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
except:
    title_font = ImageFont.load_default()
    header_font = ImageFont.load_default()
    body_font = ImageFont.load_default()
    small_font = ImageFont.load_default()
    caption_font = ImageFont.load_default()

# Color palette
colors = {
    'title_bg': '#2C3E50',      # Dark blue-gray
    'title_text': '#FFFFFF',     # White
    'what_bg': '#3498DB',        # Blue
    'why_bg': '#E74C3C',         # Red
    'capabilities_bg': '#27AE60', # Green
    'setup_bg': '#F39C12',       # Orange
    'usage_bg': '#9B59B6',       # Purple
    'mechanism_bg': '#1ABC9C',   # Teal
    'arrow': '#34495E',          # Dark gray
    'box_border': '#7F8C8D',     # Gray
    'text': '#2C3E50',           # Dark text
    'flow_arrow': '#E67E22',     # Orange for flow
    'response_arrow': '#27AE60', # Green for responses
}

# Helper function to draw rounded rectangle
def rounded_rectangle(draw, xy, radius, fill=None, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill, outline=outline, width=width)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill, outline=outline, width=width)
    draw.pieslice([x1, y1, x1 + 2*radius, y1 + 2*radius], 180, 270, fill=fill, outline=outline, width=width)
    draw.pieslice([x2 - 2*radius, y1, x2, y1 + 2*radius], 270, 360, fill=fill, outline=outline, width=width)
    draw.pieslice([x1, y2 - 2*radius, x1 + 2*radius, y2], 90, 180, fill=fill, outline=outline, width=width)
    draw.pieslice([x2 - 2*radius, y2 - 2*radius, x2, y2], 0, 90, fill=fill, outline=outline, width=width)

# Helper function to draw arrow
def draw_arrow(draw, start, end, color, width=4, label=None, label_offset=0):
    x1, y1 = start
    x2, y2 = end
    draw.line([start, end], fill=color, width=width)
    
    # Calculate arrowhead
    import math
    angle = math.atan2(y2 - y1, x2 - x1)
    arrow_length = 20
    arrow_angle = 0.5
    
    # Arrowhead points
    x3 = x2 - arrow_length * math.cos(angle - arrow_angle)
    y3 = y2 - arrow_length * math.sin(angle - arrow_angle)
    x4 = x2 - arrow_length * math.cos(angle + arrow_angle)
    y4 = y2 - arrow_length * math.sin(angle + arrow_angle)
    
    draw.polygon([(x2, y2), (x3, y3), (x4, y4)], fill=color)
    
    # Add label if provided
    if label:
        mid_x = (x1 + x2) // 2
        mid_y = (y1 + y2) // 2 + label_offset
        bbox = draw.textbbox((0, 0), label, font=caption_font)
        text_width = bbox[2] - bbox[0]
        draw.rectangle([mid_x - text_width//2 - 5, mid_y - 8, mid_x + text_width//2 + 5, mid_y + 12], 
                      fill='#F5F5DC', outline=color, width=1)
        draw.text((mid_x - text_width//2, mid_y - 5), label, font=caption_font, fill=color)

# Helper function to draw text with wrapping
def draw_text_box(draw, text, position, font, max_width, fill='black', align='left'):
    x, y = position
    # Split by newlines first, then wrap each line
    paragraphs = text.split('\n')
    lines = []
    
    for para in paragraphs:
        if not para.strip():
            lines.append('')
            continue
        words = para.split(' ')
        current_line = []
        current_width = 0
        
        for word in words:
            if word:  # Skip empty strings
                try:
                    word_width = draw.textlength(word + ' ', font=font)
                except:
                    # Fallback for fonts that don't support textlength
                    word_width = len(word) * 10
                
                if current_width + word_width <= max_width:
                    current_line.append(word)
                    current_width += word_width
                else:
                    if current_line:
                        lines.append(' '.join(current_line))
                    current_line = [word]
                    current_width = word_width
        
        if current_line:
            lines.append(' '.join(current_line))
    
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        # Get line height - try different methods
        try:
            if hasattr(font, 'size'):
                line_height = font.size
            else:
                # Estimate based on font
                bbox = draw.textbbox((0, 0), line, font=font)
                line_height = bbox[3] - bbox[1] if bbox[3] > bbox[1] else 20
        except:
            line_height = 25
        y += line_height + 5
    
    return y

# Title
title_box = (50, 30, width - 50, 150)
draw.rectangle(title_box, fill=colors['title_bg'], outline=colors['box_border'], width=4)
title_text = "kubectl-mcp: Kubernetes MCP Server"
bbox = draw.textbbox((0, 0), title_text, font=title_font)
text_x = (width - (bbox[2] - bbox[0])) // 2
draw.text((text_x, 75), title_text, font=title_font, fill=colors['title_text'])

# WHAT IT IS section (top left)
what_y = 200
what_box = (50, what_y, 750, what_y + 220)
draw.rectangle(what_box, fill=colors['what_bg'], outline=colors['box_border'], width=3)
draw.text((70, what_y + 20), "WHAT it *is*", font=header_font, fill='white')
what_text = "A Model Context Protocol (MCP) server that exposes kubectl capabilities as tools to AI assistants like Cursor, Claude, and other MCP-aware clients."
draw_text_box(draw, what_text, (70, what_y + 70), body_font, 650, fill='white')

# WHY IT MATTERS section (top right)
why_box = (800, what_y, 1500, what_y + 220)
draw.rectangle(why_box, fill=colors['why_bg'], outline=colors['box_border'], width=3)
draw.text((820, what_y + 20), "WHY it matters", font=header_font, fill='white')
why_text = "• Makes Kubernetes accessible via natural language and AI tools\n• Wraps kubectl primitives into callable APIs\n• Enables AI-assisted troubleshooting & query execution"
draw_text_box(draw, why_text, (820, what_y + 70), body_font, 650, fill='white')

# Arrow connecting WHAT to WHY
draw_arrow(draw, (750, what_y + 110), (800, what_y + 110), colors['arrow'], width=3, label="enables", label_offset=-25)

# CORE CAPABILITIES section (middle left)
cap_y = 460
cap_box = (50, cap_y, 750, cap_y + 300)
draw.rectangle(cap_box, fill=colors['capabilities_bg'], outline=colors['box_border'], width=3)
draw.text((70, cap_y + 20), "CORE Capabilities", font=header_font, fill='white')
cap_text = "✓ list_pods - List pods by namespace\n✓ get_pod_logs - Pod logs retrieval\n✓ get_pod_status - Pod health & state\n✓ describe_pod - Details + events\n✓ get_current_context - Shows K8s context\n✓ get_events - Cluster event feed"
draw_text_box(draw, cap_text, (70, cap_y + 70), body_font, 650, fill='white')

# Arrow from WHAT to CAPABILITIES
draw_arrow(draw, (400, what_y + 220), (400, cap_y), colors['arrow'], width=3, label="provides", label_offset=-30)

# REQUIREMENTS & SETUP section (middle right)
setup_box = (800, cap_y, 1500, cap_y + 300)
draw.rectangle(setup_box, fill=colors['setup_bg'], outline=colors['box_border'], width=3)
draw.text((820, cap_y + 20), "REQUIREMENTS & SETUP", font=header_font, fill='white')
setup_text = "• Python ≥ 3.10\n• kubectl installed + configured\n• Access to a Kubernetes cluster (local/remote)\n• Install via: pip install -e . / clone & dev mode"
draw_text_box(draw, setup_text, (820, cap_y + 70), body_font, 650, fill='white')

# Arrow connecting CAPABILITIES to SETUP
draw_arrow(draw, (750, cap_y + 150), (800, cap_y + 150), colors['arrow'], width=3, label="requires", label_offset=-25)

# HOW TO USE section (bottom left)
usage_y = 800
usage_box = (50, usage_y, 750, usage_y + 220)
draw.rectangle(usage_box, fill=colors['usage_bg'], outline=colors['box_border'], width=3)
draw.text((70, usage_y + 20), "HOW to USE", font=header_font, fill='white')
usage_text = "🗣 Configure MCP settings in client (e.g., Cursor)\n🔌 Start server: python3 -m kubectl_mcp.server\n🤖 AI assistant discovers tools & executes them."
draw_text_box(draw, usage_text, (70, usage_y + 70), body_font, 650, fill='white')

# Arrow from SETUP to USAGE
draw_arrow(draw, (400, cap_y + 300), (400, usage_y), colors['arrow'], width=3, label="then", label_offset=-30)

# MECHANISM section (bottom right)
mech_box = (800, usage_y, 1500, usage_y + 220)
draw.rectangle(mech_box, fill=colors['mechanism_bg'], outline=colors['box_border'], width=3)
draw.text((820, usage_y + 20), "MECHANISM", font=header_font, fill='white')
mech_text = "[AI (Cursor, etc)] —MCP→ [kubectl-mcp Server] → Runs mapped kubectl tasks → returns structured responses to the AI engine."
draw_text_box(draw, mech_text, (820, usage_y + 70), body_font, 650, fill='white')

# Arrow connecting USAGE to MECHANISM
draw_arrow(draw, (750, usage_y + 110), (800, usage_y + 110), colors['arrow'], width=3, label="via", label_offset=-25)

# Draw detailed flow diagram at the bottom
flow_y = 1080

# Section label
draw.text((50, flow_y - 30), "ARCHITECTURE FLOW", font=header_font, fill=colors['text'])

# AI Client box
ai_box = (100, flow_y, 450, flow_y + 140)
draw.rectangle(ai_box, fill='#E8F4F8', outline=colors['arrow'], width=4)
draw.text((150, flow_y + 30), "AI Assistant", font=header_font, fill=colors['text'])
draw.text((150, flow_y + 75), "(Cursor, Claude)", font=body_font, fill=colors['text'])
draw.text((150, flow_y + 105), "MCP Client", font=small_font, fill='#7F8C8D')

# Arrow 1: AI to Server
arrow1_start = (450, flow_y + 70)
arrow1_end = (650, flow_y + 70)
draw_arrow(draw, arrow1_start, arrow1_end, colors['flow_arrow'], width=6, label="MCP Protocol\nRequest", label_offset=-35)

# kubectl-mcp Server box
server_box = (650, flow_y, 1100, flow_y + 140)
draw.rectangle(server_box, fill='#FFF4E6', outline=colors['arrow'], width=4)
draw.text((700, flow_y + 30), "kubectl-mcp", font=header_font, fill=colors['text'])
draw.text((700, flow_y + 75), "Server", font=header_font, fill=colors['text'])
draw.text((700, flow_y + 105), "MCP Server", font=small_font, fill='#7F8C8D')

# Arrow 2: Server to K8s
arrow2_start = (1100, flow_y + 70)
arrow2_end = (1300, flow_y + 70)
draw_arrow(draw, arrow2_start, arrow2_end, colors['flow_arrow'], width=6, label="kubectl\nCommands", label_offset=-35)

# Kubernetes Cluster box
k8s_box = (1300, flow_y, 1650, flow_y + 140)
draw.rectangle(k8s_box, fill='#E8F5E9', outline=colors['arrow'], width=4)
draw.text((1350, flow_y + 30), "Kubernetes", font=header_font, fill=colors['text'])
draw.text((1350, flow_y + 75), "Cluster", font=header_font, fill=colors['text'])
draw.text((1350, flow_y + 105), "Pods, Services, etc.", font=small_font, fill='#7F8C8D')

# Response arrows (going back)
response_y = flow_y + 200

# Arrow 3 (back from K8s to Server)
arrow3_start = (1300, response_y)
arrow3_end = (1100, response_y)
draw_arrow(draw, arrow3_start, arrow3_end, colors['response_arrow'], width=6, label="Pod/Event\nData", label_offset=-35)

# Arrow 4 (back from Server to AI)
arrow4_start = (650, response_y)
arrow4_end = (450, response_y)
draw_arrow(draw, arrow4_start, arrow4_end, colors['response_arrow'], width=6, label="Structured\nResponse", label_offset=-35)

# Tools list on the right side
tools_y = flow_y + 300
tools_box = (1800, flow_y, 2700, flow_y + 500)
draw.rectangle(tools_box, fill='#F8F9FA', outline=colors['box_border'], width=3)
draw.text((1820, flow_y + 20), "Available MCP Tools", font=header_font, fill=colors['text'])

tools_list = [
    "✓ list_pods",
    "✓ get_pod_logs",
    "✓ get_pod_status",
    "✓ describe_pod",
    "✓ get_current_context",
    "✓ get_events"
]

tool_y = flow_y + 80
for tool in tools_list:
    draw.text((1820, tool_y), tool, font=body_font, fill=colors['text'])
    tool_y += 60

# Draw connecting arrows from server to tools
draw_arrow(draw, (1100, flow_y + 70), (1800, flow_y + 250), '#9B59B6', width=4, label="Exposes", label_offset=0)

# Add annotation boxes
annotation_y = flow_y + 600
annotation_box = (100, annotation_y, 1650, annotation_y + 120)
draw.rectangle(annotation_box, fill='#FFF9E6', outline='#F39C12', width=2)
draw.text((120, annotation_y + 20), "💡 Key Insight:", font=header_font, fill='#E67E22')
insight_text = "The MCP server acts as a bridge, translating natural language AI requests into kubectl commands and returning structured data back to the AI assistant."
draw_text_box(draw, insight_text, (120, annotation_y + 60), body_font, 1500, fill=colors['text'])

# Add some decorative elements to make it look more like a whiteboard
# Draw some "hand-drawn" style marks
for i in range(8):
    x = 50 + i * 120
    y = 50 + (i % 3) * 40
    draw.ellipse([x, y, x + 4, y + 4], fill='#D3D3D3')

# Add a border to the entire whiteboard
draw.rectangle([20, 20, width - 20, height - 20], outline='#8B7355', width=6)

# Save the image
output_path = '/Users/rakeshcheekatimala/Desktop/Work/WorkSpace/Learnings/todo-app/kubectl-mcp-whiteboard.png'
img.save(output_path)
print(f"Whiteboard diagram saved to: {output_path}")



