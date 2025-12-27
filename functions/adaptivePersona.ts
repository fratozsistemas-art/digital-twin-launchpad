import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Adaptive Persona Engine
 * Analyzes user interaction history and dynamically adjusts:
 * - Communication style and depth
 * - Topic focus and recommendations
 * - Response complexity and format
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, currentPersona, consultationHistory } = await req.json();

    // Get or create persona memory
    let personaMemory = await base44.entities.PersonaMemory.filter({ 
      created_by: user.email 
    });
    
    if (personaMemory.length === 0) {
      personaMemory = await base44.entities.PersonaMemory.create({
        preferred_persona: currentPersona || 'professor',
        interaction_count: 0,
        preferred_depth: 'standard',
        topic_preferences: {},
        engagement_metrics: {},
        communication_style: {},
        suggested_deep_dives: []
      });
    } else {
      personaMemory = personaMemory[0];
    }

    // Analyze query to detect topics
    const detectedTopics = analyzeQueryTopics(query);
    
    // Update topic preferences based on detected topics
    const updatedTopicPreferences = { ...personaMemory.topic_preferences };
    detectedTopics.forEach(topic => {
      updatedTopicPreferences[topic] = (updatedTopicPreferences[topic] || 0) + 5;
      // Cap at 100
      if (updatedTopicPreferences[topic] > 100) {
        updatedTopicPreferences[topic] = 100;
      }
    });

    // Analyze interaction history to determine depth preference
    const depthPreference = analyzeDepthPreference(consultationHistory, personaMemory);
    
    // Calculate technical tolerance based on query complexity
    const technicalTolerance = calculateTechnicalTolerance(query, personaMemory);

    // Generate adaptive response parameters
    const adaptiveParams = {
      persona: determineOptimalPersona(currentPersona, personaMemory, detectedTopics),
      depth: depthPreference,
      technicalLevel: technicalTolerance,
      formalityLevel: personaMemory.communication_style?.formality_preference || 'professional',
      includeVisualizations: personaMemory.communication_style?.data_visualization_preference !== false,
      sourceDetailLevel: personaMemory.communication_style?.source_detail_level || 'standard',
      focusTopics: getTopFocusTopics(updatedTopicPreferences)
    };

    // Generate proactive deep dive suggestions
    const deepDiveSuggestions = generateDeepDiveSuggestions(
      updatedTopicPreferences,
      consultationHistory,
      personaMemory
    );

    // Update persona memory
    await base44.entities.PersonaMemory.update(personaMemory.id, {
      interaction_count: (personaMemory.interaction_count || 0) + 1,
      topic_preferences: updatedTopicPreferences,
      preferred_depth: depthPreference,
      communication_style: {
        ...personaMemory.communication_style,
        technical_tolerance: technicalTolerance
      },
      suggested_deep_dives: deepDiveSuggestions,
      last_interaction: new Date().toISOString()
    });

    return Response.json({
      adaptiveParams,
      deepDiveSuggestions,
      personaInsights: {
        topTopics: getTopFocusTopics(updatedTopicPreferences),
        engagementLevel: calculateEngagementLevel(personaMemory),
        learningProgress: calculateLearningProgress(personaMemory)
      }
    });

  } catch (error) {
    console.error('Adaptive Persona Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

// Helper Functions

function analyzeQueryTopics(query) {
  const topicKeywords = {
    brics: ['brics', 'ndb', 'nova ordem', 'multipolaridade', 'bloco'],
    global_trade: ['comércio', 'trade', 'exportação', 'importação', 'balança'],
    competitiveness: ['competitividade', 'produtividade', 'eficiência', 'competir'],
    geopolitics: ['geopolítica', 'geopolitics', 'diplomacia', 'relações internacionais'],
    emerging_markets: ['emergentes', 'emerging', 'desenvolvimento', 'crescimento'],
    sustainability: ['sustentabilidade', 'sustainability', 'esg', 'verde', 'clima'],
    economic_diplomacy: ['diplomacia econômica', 'economic diplomacy', 'negociação'],
    financial_markets: ['mercado', 'bolsa', 'ações', 'investimento', 'financeiro']
  };

  const detectedTopics = [];
  const lowerQuery = query.toLowerCase();

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      detectedTopics.push(topic);
    }
  }

  return detectedTopics;
}

function analyzeDepthPreference(history, memory) {
  if (!history || history.length < 5) {
    return 'standard';
  }

  // Analyze average message length and follow-up patterns
  const avgUserMessageLength = history
    .filter(m => m.role === 'user')
    .reduce((sum, m) => sum + m.content.length, 0) / history.length;

  const followUpRate = calculateFollowUpRate(history);

  if (avgUserMessageLength > 200 && followUpRate > 0.7) {
    return 'comprehensive';
  } else if (avgUserMessageLength < 50 && followUpRate < 0.3) {
    return 'concise';
  }

  return 'standard';
}

function calculateFollowUpRate(history) {
  if (history.length < 2) return 0;
  
  let followUps = 0;
  for (let i = 1; i < history.length; i++) {
    if (history[i].role === 'user' && history[i-1].role === 'assistant') {
      followUps++;
    }
  }
  
  return followUps / (history.length / 2);
}

function calculateTechnicalTolerance(query, memory) {
  const technicalTerms = [
    'gdp', 'pib', 'taxa de câmbio', 'balança comercial', 'déficit',
    'superávit', 'elasticidade', 'commodity', 'derivatives', 'swap'
  ];

  const technicalTermCount = technicalTerms.filter(term => 
    query.toLowerCase().includes(term)
  ).length;

  const baseTolerance = memory.communication_style?.technical_tolerance || 50;
  
  // Adjust based on query complexity
  const adjustment = (technicalTermCount / technicalTerms.length) * 30;
  
  return Math.min(100, Math.max(0, baseTolerance + adjustment));
}

function determineOptimalPersona(current, memory, topics) {
  // If user explicitly selected, respect that
  if (current) return current;

  // Otherwise, suggest based on interaction patterns
  const interactionCount = memory.interaction_count || 0;
  
  if (interactionCount < 3) {
    return 'professor'; // Default for new users
  }

  // If user frequently engages with technical/financial topics, suggest analyst
  const technicalTopics = ['financial_markets', 'global_trade', 'competitiveness'];
  if (topics.some(t => technicalTopics.includes(t))) {
    return 'analyst';
  }

  // If formal communication style detected, suggest diplomat
  if (memory.communication_style?.formality_preference === 'academic') {
    return 'diplomat';
  }

  return memory.preferred_persona || 'professor';
}

function getTopFocusTopics(topicPreferences) {
  return Object.entries(topicPreferences)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([topic]) => topic);
}

function generateDeepDiveSuggestions(topicPreferences, history, memory) {
  const suggestions = [];
  const topTopics = getTopFocusTopics(topicPreferences);

  // Suggest based on high-engagement topics
  topTopics.forEach((topic, index) => {
    if (topicPreferences[topic] > 60) {
      suggestions.push({
        topic: formatTopicName(topic),
        reason: `You've shown strong interest in ${formatTopicName(topic)}`,
        priority: 100 - (index * 10),
        generated_at: new Date().toISOString()
      });
    }
  });

  // Suggest complementary topics
  if (topicPreferences.brics > 50 && topicPreferences.global_trade < 30) {
    suggestions.push({
      topic: 'Global Trade Dynamics',
      reason: 'Complement your BRICS knowledge with trade analysis',
      priority: 70,
      generated_at: new Date().toISOString()
    });
  }

  // Sort by priority
  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

function formatTopicName(topic) {
  const names = {
    brics: 'BRICS and Multipolarity',
    global_trade: 'Global Trade',
    competitiveness: 'Competitiveness',
    geopolitics: 'Geopolitics',
    emerging_markets: 'Emerging Markets',
    sustainability: 'Sustainability',
    economic_diplomacy: 'Economic Diplomacy',
    financial_markets: 'Financial Markets'
  };
  return names[topic] || topic;
}

function calculateEngagementLevel(memory) {
  const metrics = memory.engagement_metrics || {};
  const interactionCount = memory.interaction_count || 0;

  if (interactionCount > 20 && metrics.follow_up_rate > 0.6) {
    return 'high';
  } else if (interactionCount > 5) {
    return 'medium';
  }
  return 'low';
}

function calculateLearningProgress(memory) {
  const topicCount = Object.keys(memory.topic_preferences || {}).length;
  const avgTopicScore = Object.values(memory.topic_preferences || {})
    .reduce((sum, score) => sum + score, 0) / (topicCount || 1);

  return Math.round((topicCount * 10 + avgTopicScore) / 2);
}