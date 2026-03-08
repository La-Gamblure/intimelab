import { visit } from 'unist-util-visit';

const PILL_RULES = [
  { match: 'Tres elevee', css: 'pill-green' },
  { match: 'Excellente', css: 'pill-green' },
  { match: 'Le meilleur choix', css: 'pill-green' },
  { match: 'Elevee', css: 'pill-lime' },
  { match: 'Tres bonne', css: 'pill-lime' },
  { match: 'Excellente alternative', css: 'pill-lime' },
  { match: 'Fort', css: 'pill-lime' },
  { match: 'Bon', css: 'pill-lime' },
  { match: 'Bonne', css: 'pill-lime' },
  { match: 'Moyenne', css: 'pill-yellow' },
  { match: 'Modere', css: 'pill-yellow' },
  { match: 'Variable', css: 'pill-yellow' },
  { match: 'Correct mais', css: 'pill-yellow' },
  { match: 'Faible', css: 'pill-red' },
  { match: 'Mauvaise', css: 'pill-red' },
  { match: 'A eviter', css: 'pill-red' },
  { match: 'Tres faible', css: 'pill-darkred' },
].sort((a, b) => b.match.length - a.match.length);

function getTextContent(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}

export default function rehypeTablePills() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'td') return;
      const text = getTextContent(node).trim();
      if (!text || /EUR|\d+-\d+/.test(text)) return;
      const rule = PILL_RULES.find((r) => text.startsWith(r.match));
      if (rule) {
        node.children = [{
          type: 'element', tagName: 'span',
          properties: { className: [rule.css] },
          children: [{ type: 'text', value: text }],
        }];
      }
    });

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index == null) return;
      const text = getTextContent(node).trim().toLowerCase();
      let listClass = null;
      if (text.startsWith('avantages')) listClass = 'list-pros';
      else if (text.startsWith('inconvenients') || text.startsWith('inconvénients')) listClass = 'list-cons';
      if (!listClass) return;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sibling = parent.children[i];
        if (sibling.type === 'text' && !sibling.value.trim()) continue;
        if (sibling.type === 'element' && sibling.tagName === 'ul') {
          sibling.properties = sibling.properties || {};
          sibling.properties.className = [
            ...(sibling.properties.className || []),
            listClass,
          ];
        }
        break;
      }
    });
  };
}
