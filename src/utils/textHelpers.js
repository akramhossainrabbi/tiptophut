// Helper function to get English text from multi-language object
export const getText = (textObj, language = 'en') => {
  if (!textObj) return '';

  // If it's a string, try to parse JSON
  if (typeof textObj === 'string') {
    try {
      const parsed = JSON.parse(textObj);
      if (parsed && typeof parsed === 'object') {
        return parsed[language] || parsed.en || Object.values(parsed)[0] || '';
      }
      return textObj;
    } catch {
      // Normal string, not JSON
      return textObj;
    }
  }

  // If it's an object
  if (textObj[language]) return textObj[language];
  if (textObj.en) return textObj.en;

  const firstKey = Object.keys(textObj)[0];
  return textObj[firstKey] || '';
};


// Helper function to truncate text
export const textLimit = (text, limit = 25) => {
  const textStr = getText(text);
  if (!textStr) return '';
  if (textStr.length <= limit) return textStr;
  return textStr.substring(0, limit) + '...';
};