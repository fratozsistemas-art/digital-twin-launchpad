import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { integration } = await req.json();

    let result = {};

    // Test different API providers
    switch (integration.provider) {
      case 'ibge':
        // Test IBGE API - get PIB data
        const ibgeResponse = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1620/periodos/2023/variaveis/585?localidades=N1[all]');
        const ibgeData = await ibgeResponse.json();
        result = {
          success: true,
          provider: 'IBGE',
          sample_data: ibgeData,
          message: 'Conexão com IBGE estabelecida com sucesso'
        };
        break;

      case 'banco_central_brasil':
        // Test Banco Central API - get exchange rate
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const bcbResponse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${today}'&$format=json`);
        const bcbData = await bcbResponse.json();
        result = {
          success: true,
          provider: 'Banco Central do Brasil',
          sample_data: bcbData,
          message: 'Conexão com Banco Central estabelecida'
        };
        break;

      case 'world_bank':
        // Test World Bank API - get Brazil GDP data
        const wbResponse = await fetch('https://api.worldbank.org/v2/country/BR/indicator/NY.GDP.MKTP.CD?format=json&date=2020:2023');
        const wbData = await wbResponse.json();
        result = {
          success: true,
          provider: 'World Bank',
          sample_data: wbData,
          message: 'Conexão com World Bank estabelecida'
        };
        break;

      case 'fred':
        // Test FRED API - requires API key
        if (!integration.api_key) {
          return Response.json({
            success: false,
            message: 'API Key do FRED é necessária. Obtenha em: https://fred.stlouisfed.org/docs/api/api_key.html'
          });
        }
        const fredResponse = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=${integration.api_key}&file_type=json&limit=5`);
        const fredData = await fredResponse.json();
        result = {
          success: true,
          provider: 'FRED',
          sample_data: fredData,
          message: 'Conexão com FRED estabelecida'
        };
        break;

      case 'alpha_vantage':
        // Test Alpha Vantage - requires API key
        if (!integration.api_key) {
          return Response.json({
            success: false,
            message: 'API Key do Alpha Vantage é necessária. Obtenha em: https://www.alphavantage.co/support/#api-key'
          });
        }
        const avResponse = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=PETR4.SA&apikey=${integration.api_key}`);
        const avData = await avResponse.json();
        result = {
          success: true,
          provider: 'Alpha Vantage',
          sample_data: avData,
          message: 'Conexão com Alpha Vantage estabelecida'
        };
        break;

      case 'newsapi':
        // Test NewsAPI - requires API key
        if (!integration.api_key) {
          return Response.json({
            success: false,
            message: 'API Key do NewsAPI é necessária. Obtenha em: https://newsapi.org/register'
          });
        }
        const newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=${integration.api_key}`);
        const newsData = await newsResponse.json();
        result = {
          success: true,
          provider: 'NewsAPI',
          sample_data: newsData,
          message: 'Conexão com NewsAPI estabelecida'
        };
        break;

      default:
        return Response.json({
          success: false,
          message: 'Provedor não suportado para teste automático'
        });
    }

    // Update integration with test results
    if (integration.id) {
      await base44.entities.ExternalIntegration.update(integration.id, {
        status: 'active',
        last_sync: new Date().toISOString(),
        sync_count: (integration.sync_count || 0) + 1,
        error_message: null
      });
    }

    return Response.json(result);
  } catch (error) {
    // Update integration with error
    try {
      const base44 = createClientFromRequest(req);
      const { integration } = await req.json();
      if (integration?.id) {
        await base44.entities.ExternalIntegration.update(integration.id, {
          status: 'error',
          error_message: error.message
        });
      }
    } catch (updateError) {
      console.error('Error updating integration:', updateError);
    }

    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
});