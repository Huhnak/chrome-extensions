document.addEventListener('copy', (e) => {
    const selection = window.getSelection();
    if (!selection.toString().trim()) return; 
  
    // Удаляем лишние пробелы между абзацами
    const cleanedText = selection.toString()
        .replace(/\n\s+\n/g, '\n\n')
        .replace(/\s+$/gm, '');
  
    e.clipboardData.setData('text/plain', cleanedText);
    e.preventDefault();
});