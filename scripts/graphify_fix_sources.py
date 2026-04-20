#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTRACT_PATH = ROOT / "graphify-out" / ".graphify_extract.json"
GRAPH_PATH = ROOT / "graphify-out" / "graph.json"

DEFAULT_SOURCE = ("README.md", "L1")
SOURCE_MAP = {
    "dsa_learning_app": ("README.md", "L1"),
    "react_19": ("README.md", "L1"),
    "vite": ("README.md", "L1"),
    "typescript": ("README.md", "L1"),
    "tailwind_css": ("README.md", "L1"),
    "framer_motion": ("README.md", "L1"),
    "recharts": ("README.md", "L1"),
    "idb_keyval": ("README.md", "L1"),
    "src_components": ("src/components", "L1"),
    "src_contexts": ("src/contexts", "L1"),
    "src_data": ("src/data", "L1"),
    "src_hooks": ("src/hooks", "L1"),
    "src_pages": ("src/pages", "L1"),
    "src_types": ("src/types", "L1"),
    "src_app_tsx": ("src/App.tsx", "L1"),
    "interactive_visualizers": ("README.md", "L1"),
    "big_o_notation_guide": ("README.md", "L1"),
    "problem_practice": ("README.md", "L1"),
    "learning_roadmap": ("README.md", "L1"),
    "graphify": ("CLAUDE.md", "L1"),
    "claude_md": ("CLAUDE.md", "L1"),
    "readme_md": ("README.md", "L1"),
}


def normalize_node(node: dict) -> bool:
    if node.get("source_file"):
        return False

    source_file, source_location = SOURCE_MAP.get(node.get("id"), DEFAULT_SOURCE)
    node["source_file"] = source_file
    node.setdefault("source_location", source_location)
    return True


def patch_extract() -> int:
    if not EXTRACT_PATH.exists():
        return 0

    data = json.loads(EXTRACT_PATH.read_text(encoding="utf-8"))
    changed = 0
    for node in data.get("nodes", []):
        if normalize_node(node):
            changed += 1

    if changed:
        EXTRACT_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")

    return changed


def patch_graph() -> int:
    if not GRAPH_PATH.exists():
        return 0

    data = json.loads(GRAPH_PATH.read_text(encoding="utf-8"))
    changed = 0
    for node in data.get("nodes", []):
        if normalize_node(node):
            changed += 1

    if changed:
        GRAPH_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")

    return changed


def main() -> None:
    extract_changed = patch_extract()
    graph_changed = patch_graph()
    total = extract_changed + graph_changed
    print(
        f"graphify source fix complete: extract={extract_changed}, graph={graph_changed}, total={total}"
    )


if __name__ == "__main__":
    main()
