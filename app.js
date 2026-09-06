document.addEventListener('DOMContentLoaded', () => {

  const projectionButtons = document.querySelectorAll('.projection');
  const apContent = document.getElementById('ap-content');
  const placeholder = document.getElementById('placeholder-content');
  const placeholderTitle = document.getElementById('placeholder-title');
  const backButton = document.getElementById('back-ap');

  projectionButtons.forEach(button => {
    button.addEventListener('click', () => {
      projectionButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      if (button.dataset.projection === 'ap') {
        if (apContent) apContent.classList.remove('hidden');
        if (placeholder) placeholder.classList.add('hidden');
      } else {
        if (apContent) apContent.classList.add('hidden');
        if (placeholder) placeholder.classList.remove('hidden');
        if (placeholderTitle) {
          placeholderTitle.textContent =
            button.dataset.projection === 'mortise'
              ? 'Mortise view'
              : 'Lateral view';
        }
      }
    });
  });

  if (backButton) {
    backButton.addEventListener('click', () => {
      const apButton = document.querySelector('[data-projection="ap"]');
      if (apButton) apButton.click();
    });
  }

  const tabs = document.querySelectorAll('.tabs [data-tab]');
  const tabSections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('tab-active'));
      tab.classList.add('tab-active');

      if (target === 'positioning' || target === 'radiographs') {
        tabSections.forEach(section => {
          section.classList.toggle(
            'hidden',
            section.dataset.tabSection !== target
          );
        });

        if (placeholder) placeholder.classList.add('hidden');

        if (target === 'positioning') {
          const apButton = document.querySelector('[data-projection="ap"]');
          if (apButton) apButton.click();
        }
      } else {
        tabSections.forEach(section => section.classList.add('hidden'));

        if (placeholder) placeholder.classList.remove('hidden');
        if (placeholderTitle) {
          placeholderTitle.textContent = `${tab.textContent.trim()} module`;
        }
      }
    });
  });

  const anatomyPoints = {
    tibia: { label: 'Tibia', x: 63, y: 20, line: 18, side: 'right' },
    fibula: { label: 'Fibula', x: 63, y: 34, line: 18, side: 'left' },
    talus: { label: 'Talus', x: 60, y: 55, line: 18, side: 'right' },
    'medial-malleolus': {
      label: 'Medial malleolus', x: 67, y: 51, line: 20, side: 'right'
    },
    'lateral-malleolus': {
      label: 'Lateral malleolus', x: 67, y: 52, line: 20, side: 'left'
    },
    'tibiotalar-joint': {
      label: 'Tibiotalar joint', x: 45, y: 43, line: 22, side: 'right'
    }
  };

  const annotation = document.getElementById('anatomy-annotation');
  const annotationLabel = document.getElementById('annotation-label');
  const anatomyButtons = document.querySelectorAll('.anatomy-button');

  function showAnatomy(anatomyKey) {
    const point = anatomyPoints[anatomyKey];
    if (!point || !annotation || !annotationLabel) return;

    anatomyButtons.forEach(button => {
      button.classList.toggle(
        'active',
        button.dataset.anatomy === anatomyKey
      );
    });

    annotation.style.setProperty('--x', `${point.x}%`);
    annotation.style.setProperty('--y', `${point.y}%`);
    annotation.style.setProperty('--line-length', `${point.line}%`);
    annotation.dataset.side = point.side;
    annotationLabel.textContent = point.label;

    annotation.classList.remove('visible');
    requestAnimationFrame(() => annotation.classList.add('visible'));
  }

  anatomyButtons.forEach(button => {
    button.addEventListener('click', () => {
      showAnatomy(button.dataset.anatomy);
    });
  });

});
