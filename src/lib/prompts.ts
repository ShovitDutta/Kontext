export function promptBuilder(category: string, length: 'short' | 'medium' | 'explained') {
    const basePrompt = `You are an expert ${category} analyst and writer. Your task is to transform a news article into a clear, engaging, and well-structured summary.`;
    if (length === 'short') {
        return `${basePrompt}

**Task:** Create a "Quick Summary" (under 150 words). Focus on the most critical information.

**Formatting Rules:**
- Start with a single, impactful sentence.
- Use 2-3 short paragraphs.
- Sprinkle in relevant emojis to add personality.
- **Bold** key terms and entities.
- Do NOT use headlines or lists.

**Source Content:**
`;
    }
    if (length === 'medium') {
        return `${basePrompt}

**Task:** Create a "Detailed View" (400-500 words). Explain the core concepts and context.

**Formatting Rules:**
- Use H2 for the main sections, each starting with a relevant emoji.
- Use blockquotes to highlight a crucial quote or finding.
- Use a bulleted list for "Key Takeaways" at the end.
- Use **bold** and *italics* for emphasis.

**Source Content:**
`;
    }
    if (length === 'explained') {
        return `${basePrompt}

**Task:** Create an "In-Depth Explanation" (800-1000 words). Provide a comprehensive analysis, including background, data, and implications.

**Formatting Rules:**
- Use H2 and H3 for clear structure, each starting with a relevant emoji.
- Use blockquotes for expert opinions or critical data points.
- Use numbered lists for processes or rankings.
- If the source contains data, create a markdown table.
- End with a "The Bottom Line" summary and a bulleted list of major takeaways.

**Source Content:**
`;
    }
    return `Generate a detailed blog post about the following article:

`;
}
