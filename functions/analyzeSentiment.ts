import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { dataSourceId } = await req.json();

    // Fetch data source
    const dataSources = await base44.entities.DataSource.filter({ id: dataSourceId });
    const dataSource = dataSources[0];

    if (!dataSource) {
      return Response.json({ error: 'Data source not found' }, { status: 404 });
    }

    // Fetch file content if available
    let content = '';
    if (dataSource.file_url) {
      const fileResponse = await fetch(dataSource.file_url);
      if (fileResponse.ok) {
        content = await fileResponse.text();
      }
    }

    // If no content from file, use description and extracted insights
    if (!content) {
      content = `${dataSource.description || ''}\n${(dataSource.extracted_insights || []).join('\n')}`;
    }

    // Truncate content if too long (max 10000 chars)
    if (content.length > 10000) {
      content = content.substring(0, 10000) + '...';
    }

    // Call LLM for sentiment analysis
    const analysisResult = await base44.integrations.Core.InvokeLLM({
      prompt: `Analyze the sentiment of the following content from a data source. 
      
Content:
${content}

Provide a comprehensive sentiment analysis with:
1. Overall sentiment score (-100 to 100, where -100 is extremely negative, 0 is neutral, 100 is extremely positive)
2. Sentiment label (very_negative, negative, neutral, positive, very_positive)
3. Count of positive, negative, and neutral statements
4. Key themes detected (up to 5)

Focus on economic, political, and strategic implications.`,
      response_json_schema: {
        type: 'object',
        properties: {
          overall_score: {
            type: 'number',
            description: 'Overall sentiment score from -100 to 100'
          },
          sentiment_label: {
            type: 'string',
            enum: ['very_negative', 'negative', 'neutral', 'positive', 'very_positive']
          },
          positive_count: {
            type: 'number'
          },
          negative_count: {
            type: 'number'
          },
          neutral_count: {
            type: 'number'
          },
          key_themes: {
            type: 'array',
            items: {
              type: 'string'
            },
            maxItems: 5
          }
        },
        required: ['overall_score', 'sentiment_label', 'positive_count', 'negative_count', 'neutral_count', 'key_themes']
      }
    });

    // Update data source with sentiment analysis
    await base44.entities.DataSource.update(dataSourceId, {
      sentiment_analysis: {
        ...analysisResult,
        last_analysis: new Date().toISOString()
      },
      status: 'active'
    });

    return Response.json({
      success: true,
      sentiment_analysis: analysisResult
    });

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
});