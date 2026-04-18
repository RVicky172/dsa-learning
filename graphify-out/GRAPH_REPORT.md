# Knowledge Graph Report

## Corpus Summary
- **Files**: 53
- **Words**: ~98,449
- **File Types**: 
  - Code: 46
  - Documents: 3
  - Images: 4

## Graph Structure
- **Nodes**: 179
- **Edges**: 411
- **Communities**: 21

## God Nodes (Most Connected Entities)

These are the most central nodes in the graph - high connectivity indicates architectural importance:

1. **src/App.tsx** (id: src_app_tsx, degree: 6)
2. **updateProgress()** (id: learningpath_updateprogress, degree: 2)
3. **if()** (id: learningpath_if, degree: 2)
4. **NavbarRedesigned()** (id: navbar_navbarredesigned, degree: 2)
5. **TopicCard()** (id: topiccard_topiccard, degree: 2)
6. **useProgress()** (id: useprogress_useprogress, degree: 2)
7. **useTheme()** (id: usetheme_usetheme, degree: 2)


## Surprising Connections

Unexpected or interesting relationships in the graph:

1. {'source': 'NavbarRedesigned()', 'target': 'useTheme()', 'source_files': ['src\\components\\Navbar.tsx', 'src\\hooks\\useTheme.ts'], 'confidence': 'INFERRED', 'relation': 'calls', 'why': 'inferred connection - not explicitly stated in source; connects across different repos/directories'}
2. {'source': 'TopicCard()', 'target': 'useProgress()', 'source_files': ['src\\components\\TopicCard.tsx', 'src\\hooks\\useProgress.ts'], 'confidence': 'INFERRED', 'relation': 'calls', 'why': 'inferred connection - not explicitly stated in source; connects across different repos/directories'}
