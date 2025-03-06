const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Debug logging function
const logResponse = (response) => {
  console.log('Status:', response.status);
  console.log('Headers:', JSON.stringify(response.headers, null, 2));
  const responseData = typeof response.data === 'string' 
    ? response.data.substring(0, 500) + '...' 
    : JSON.stringify(response.data).substring(0, 500) + '...';
  console.log('Response data (truncated):', responseData);
};

// Zepto API endpoint
app.post('/api/suggestions', async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log('Sending request to Zepto with query:', query);

    const headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'app_sub_platform': 'WEB',
      'app_version': '12.55.3',
      'appversion': '12.55.3',
      'auth_revamp_flow': 'v2',
      'compatible_components': 'CONVENIENCE_FEE,RAIN_FEE,EXTERNAL_COUPONS,STANDSTILL,BUNDLE,MULTI_SELLER_ENABLED,PIP_V1,ROLLUPS,SCHEDULED_DELIVERY,SAMPLING_ENABLED,ETA_NORMAL_WITH_149_DELIVERY,ETA_NORMAL_WITH_199_DELIVERY,HOMEPAGE_V2,NEW_ETA_BANNER,VERTICAL_FEED_PRODUCT_GRID,AUTOSUGGESTION_PAGE_ENABLED,AUTOSUGGESTION_PIP,AUTOSUGGESTION_AD_PIP,BOTTOM_NAV_FULL_ICON,COUPON_WIDGET_CART_REVAMP,DELIVERY_UPSELLING_WIDGET,MARKETPLACE_CATEGORY_GRID,NO_PLATFORM_CHECK_ENABLED_V2,SUPER_SAVER:1,SUPERSTORE_V1,PROMO_CASH:0,24X7_ENABLED_V1,TABBED_CAROUSEL_V2,HP_V4_FEED,NEW_ROLLUPS_ENABLED,RERANKING_QCL_RELATED_PRODUCTS,PLP_ON_SEARCH,PAAN_BANNER_WIDGETIZED,ROLLUPS_UOM,DYNAMIC_FILTERS,PHARMA_ENABLED,AUTOSUGGESTION_RECIPE_PIP,SEARCH_FILTERS_V1,QUERY_DESCRIPTION_WIDGET,MEDS_WITH_SIMILAR_SALT_WIDGET,NEW_FEE_STRUCTURE,NEW_BILL_INFO,RE_PROMISE_ETA_ORDER_SCREEN_ENABLED,SUPERSTORE_V1,MANUALLY_APPLIED_DELIVERY_FEE_RECEIVABLE,MARKETPLACE_REPLACEMENT,ZEPTO_PASS,ZEPTO_PASS:1,ZEPTO_PASS:2,ZEPTO_PASS_RENEWAL,CART_REDESIGN_ENABLED,SHIPMENT_WIDGETIZATION_ENABLED,TABBED_CAROUSEL_V2,24X7_ENABLED_V1,PROMO_CASH:0,HOMEPAGE_V2,SUPER_SAVER:1,NO_PLATFORM_CHECK_ENABLED_V2,HP_V4_FEED,GIFTING_ENABLED,OFSE',
      'content-type': 'application/json',
      'device_id': '32f53855-d0f3-442e-b873-028b7d9cd63d',
      'deviceid': '32f53855-d0f3-442e-b873-028b7d9cd63d',
      'marketplace_type': 'ZEPTO_NOW',
      'origin': 'https://www.zeptonow.com',
      'platform': 'WEB',
      'priority': 'u=1, i',
      'referer': 'https://www.zeptonow.com/',
      'request_id': '5407b4b9-dd75-4dea-99fe-cfe34dbd1893',
      'requestid': '5407b4b9-dd75-4dea-99fe-cfe34dbd1893',
      'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'session_id': '20e0d629-43d2-4c16-8ec7-a0f7c6f182ad',
      'sessionid': '20e0d629-43d2-4c16-8ec7-a0f7c6f182ad',
      'store_etas': '{"fa5e892d-65d7-4da6-9bde-e1f22deb7b6f":-1}',
      'store_id': 'fa5e892d-65d7-4da6-9bde-e1f22deb7b6f',
      'store_ids': 'fa5e892d-65d7-4da6-9bde-e1f22deb7b6f',
      'storeid': 'fa5e892d-65d7-4da6-9bde-e1f22deb7b6f',
      'tenant': 'ZEPTO',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',
      'x-without-bearer': 'true',
      'x-xsrf-token': 'rGiwDS555055dPeHmj8TC:bDiVklgvv0My2T8oPI07DbQXP80.apXzWcCALhI7HeI99s+u5mMvp4In2+EmzOVvvF/4Muk',
      'cookie': '_gcl_au=1.1.1391060433.1741257931; _fbp=fb.1.1741257930719.303203072797398688; _ga=GA1.1.1063580299.1741257931; mp_dcc8757645c1c32f4481b555710c7039_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A1956b0f77cf23a-04598d59cb8805-1c525636-1fa400-1956b0f77cf23a%22%2C%22%24device_id%22%3A%20%221956b0f77cf23a-04598d59cb8805-1c525636-1fa400-1956b0f77cf23a%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; _ga_52LKG2B3L1=GS1.1.1741283492.2.1.1741283492.60.0.1266830498'
    };

    const payload = {
      query: query,
      pageNumber: 0,
      intentId: '4afcde42-26b2-47ac-a0e5-8e1a240abefa',
      mode: 'AUTOSUGGEST',
      userSessionId: '20e0d629-43d2-4c16-8ec7-a0f7c6f182ad'
    };

    const apiResponse = await axios({
      method: 'POST',
      url: 'https://api.zeptonow.com/api/v3/search',
      headers: headers,
      data: payload,
      timeout: 5000,
      validateStatus: (status) => status >= 200 && status < 600
    });

    console.log('Zepto response status:', apiResponse.status);
    logResponse(apiResponse);

    if (typeof apiResponse.data === 'string' && apiResponse.data.includes('<!DOCTYPE html>')) {
      console.log('Received HTML error page instead of JSON');
      return res.status(500).json({ error: 'API returned HTML instead of JSON', details: apiResponse.data.substring(0, 500) });
    }

    // Extract suggestions from the response
    const layout = apiResponse.data.layout || [];
    const suggestions = [];
    
    layout.forEach(widget => {
      if (widget.widgetId === 'PRODUCT_GRID' && widget.data.resolver.data.items) {
        widget.data.resolver.data.items.forEach(item => {
          const productName = item.productResponse.product.name;
          if (!suggestions.includes(productName)) {
            suggestions.push(productName);
          }
        });
      }
    });

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error.message);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      res.status(error.response.status).json({
        error: 'Zepto API error',
        status: error.response.status,
        message: error.message
      });
    } else if (error.request) {
      console.error('No response received');
      res.status(500).json({ 
        error: 'No response received',
        message: error.message
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch suggestions', message: error.message });
    }
  }
});

// Mock API endpoint (fallback)
app.post('/api/mock-suggestions', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  
  const mockSuggestions = [
    `${query}`,
    `${query} packet`,
    `${query} family pack`,
    `${query} masala`,
    `${query} classic salted`
  ];
  
  setTimeout(() => {
    res.json({ suggestions: mockSuggestions });
  }, 200);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});