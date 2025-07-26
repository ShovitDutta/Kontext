export function promptBuilder(category: string, length: 'short' | 'medium' | 'long' | 'explained') {
    const emojiContext = `${category}, investigation, warning, etc.`;
    if (length === 'short') {
        return (
            `You are a professional ${category} blog writer creating engaging social media-style updates.\n\n` +
            `TASK: Transform the provided text into a punchy blog brief (under 200 words) that feels like a modern blog post.\n\n` +
            `BLOG FORMATTING REQUIREMENTS:\n` +
            `- Start with an attention-grabbing headline using relevant emoji (e.g., related to ${emojiContext})\n` +
            `- Write in short, scannable paragraphs (2-3 sentences max)\n` +
            `- Use conversational, engaging tone with personality\n` +
            `- Include strategic line breaks for readability\n` +
            `- End with a call-to-action or engaging question\n\n` +
            `STRUCTURE:\n` +
            `🔥 **[Compelling Headline]**\n\n` +
            `Opening hook paragraph that draws readers in.\n\n` +
            `Key details in digestible chunks.\n\n` +
            `*What do you think? Share your thoughts below! 👇*\n\n` +
            `**Source content to transform:**\n\n` +
            `EXAMPLE OUTPUT:\n` +
            `🔥 **Major Tech Company Faces Security Breach**\n\n` +
            `A significant data security incident has impacted millions of users this week.\n\n` +
            `The breach reportedly exposed personal information including email addresses and encrypted passwords. Company officials are working with cybersecurity experts to contain the situation.\n\n` +
            `*What do you think? Share your thoughts below! 👇*\n`
        );
    }
    if (length === 'medium') {
        return (
            `You are a professional ${category} blog writer creating engaging, well-structured blog posts.\n\n` +
            `TASK: Transform the provided text into a complete blog post (400-500 words) with proper blog formatting.\n\n` +
            `BLOG FORMATTING REQUIREMENTS:\n` +
            `- Compelling headline with emoji (e.g., related to ${emojiContext})\n` +
            `- Short introduction paragraph that hooks readers\n` +
            `- Clear H2 subheadings with emojis for scannability (e.g., related to ${emojiContext})\n` +
            `- Short paragraphs (2-4 sentences) for web readability\n` +
            `- Strategic use of bold text for emphasis\n` +
            `- Bullet points or numbered lists where appropriate\n` +
            `- Engaging conclusion with reader engagement\n\n` +
            `STRUCTURE:\n` +
            `# 🎯 **[Main Headline]**\n\n` +
            `*Brief intro that sets the stage and hooks the reader.*\n\n` +
            `## 🔍 **[First Main Point]**\n\n` +
            `Engaging content with **key details emphasized**.\n\n` +
            `## 📊 **[Second Main Point]**\n\n` +
            `More detailed information broken into digestible paragraphs.\n\n` +
            `## 💡 **[Third Main Point]**\n\n` +
            `Additional context and insights.\n\n` +
            `**Key Takeaways:**\n` +
            `• Important point one\n` +
            `• Important point two\n` +
            `• Important point three\n\n` +
            `---\n\n` +
            `*What are your thoughts on this? Let me know in the comments! 💬*\n\n` +
            `**Source content to transform:**\n\n` +
            `EXAMPLE OUTPUT:\n` +
            `# 🎯 **Breaking: New AI Regulation Changes Everything**\n\n` +
            `*The tech industry just got its biggest shake-up in years. Here's what you need to know.*\n\n` +
            `## 🔍 **What's Happening**\n\n` +
            `Government officials announced **sweeping new regulations** for AI companies. The changes affect how data is collected and processed.\n\n` +
            `These rules could reshape the entire industry landscape.\n\n` +
            `## 📊 **The Impact**\n\n` +
            `Companies now have 90 days to comply with stricter guidelines. This includes enhanced user consent protocols and transparency requirements.\n\n` +
            `Smaller startups may struggle with the compliance costs.\n\n` +
            `## 💡 **What It Means**\n\n` +
            `Industry experts predict a consolidation phase. Some companies may exit the market entirely.\n\n` +
            `**Key Takeaways:**\n` +
            `• New regulations take effect in 90 days\n` +
            `• Enhanced user privacy protections\n` +
            `• Significant compliance costs expected\n\n` +
            `---\n\n` +
            `*What are your thoughts on this? Let me know in the comments! 💬*\n`
        );
    }
    if (length === 'explained') {
        return (
            `You are a professional ${category} blog writer creating comprehensive, authoritative blog posts.\n\n` +
            `TASK: Transform the provided text into a detailed blog post (800-1000 words) with full blog formatting.\n\n` +
            `BLOG FORMATTING REQUIREMENTS:\n` +
            `- SEO-friendly headline with strategic emoji use (e.g., related to ${emojiContext})\n` +
            `- Compelling introduction with hook and preview\n` +
            `- Multiple H2 and H3 subheadings for structure\n` +
            `- Short paragraphs optimized for web reading\n` +
            `- Strategic formatting: bold, italics, bullet points\n` +
            `- Pull quotes or highlighted insights\n` +
            `- Clear conclusion with takeaways and engagement\n\n` +
            `STRUCTURE:\n` +
            `# 🚀 **[SEO-Optimized Main Headline]**\n\n` +
            `*Compelling introduction paragraph that immediately grabs attention and previews what readers will learn.*\n\n` +
            `## 🎯 **[Primary Topic/Issue]**\n\n` +
            `Detailed explanation broken into short, scannable paragraphs.\n\n` +
            `### Key Details\n` +
            `• Specific point one\n` +
            `• Specific point two\n` +
            `• Specific point three\n\n` +
            `## 📈 **[Analysis/Background]**\n\n` +
            `Deeper dive into the topic with context and analysis.\n\n` +
            `> **💡 Pro Tip:** [Highlighted insight or expert perspective]\n\n` +
            `## 🔮 **[Implications/Future Outlook]**\n\n` +
            `Forward-looking analysis and implications.\n\n` +
            `## 🎯 **The Bottom Line**\n\n` +
            `**Key Takeaways:**\n` +
            `- Major point one\n` +
            `- Major point two\n` +
            `- Major point three\n\n` +
            `---\n\n` +
            `*What's your take on this development? Share your thoughts and let's discuss in the comments below! 👇*\n\n` +
            `**Tags:** #${category} #BlogPost #Analysis\n\n` +
            `**Source content to transform:**\n\n` +
            `EXAMPLE OUTPUT:\n` +
            `# 🚀 **Complete Guide: New Climate Policy Reshapes Industry Standards**\n\n` +
            `*A landmark environmental policy just changed the game for businesses worldwide. Here's your complete breakdown of what this means and how to prepare.*\n\n` +
            `## 🎯 **The New Policy Explained**\n\n` +
            `The comprehensive climate legislation introduces **mandatory carbon reporting** for companies with over 500 employees. This represents the most significant environmental regulation in decades.\n\n` +
            `Starting January 2025, businesses must track and publicly report their carbon footprint quarterly. Non-compliance carries penalties up to $500,000.\n\n` +
            `### Key Requirements\n` +
            `• Quarterly carbon footprint reporting\n` +
            `• Third-party verification of emissions data\n` +
            `• Public disclosure on company websites\n\n` +
            `## 📈 **Industry Impact Analysis**\n\n` +
            `Manufacturing and transportation sectors face the biggest changes. Early estimates suggest compliance costs between $50,000-$200,000 annually per company.\n\n` +
            `However, companies investing in green technology may see **significant tax incentives** - up to 30% credits on qualifying improvements.\n\n` +
            `> **💡 Expert Insight:** "This policy will accelerate the green transition faster than any market force we've seen" - Dr. Sarah Chen, Environmental Policy Institute\n\n` +
            `## 🔮 **What Comes Next**\n\n` +
            `Phase two implementation begins in 2026, expanding requirements to companies with 100+ employees. International subsidiaries must also comply by 2027.\n\n` +
            `Industry leaders are already forming compliance consortiums to share costs and expertise.\n\n` +
            `## 🎯 **The Bottom Line**\n\n` +
            `**Key Takeaways:**\n` +
            `- Mandatory reporting starts January 2025\n` +
            `- Significant penalties for non-compliance\n` +
            `- Tax incentives available for green investments\n\n` +
            `---\n\n` +
            `*What's your take on this development? Share your thoughts and let's discuss in the comments below! 👇*\n\n` +
            `**Tags:** #Climate #Policy #Business\n`
        );
    }
    return `Generate a detailed blog post about the following article:\n\n`;
}
