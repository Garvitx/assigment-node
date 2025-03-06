

////////////////////////////////////////////////////////////////////////////////
// blinkitRequest.js
////////////////////////////////////////////////////////////////////////////////
const axios = require('axios');

async function fetchBlinkitData() {
  try {
    const response = await axios.post(
      // Note: The URL still includes query params (?q=kurkure&search_type=type_to_search)
      'https://blinkit.com/v1/layout/search?q=kurkure&search_type=type_to_search',
      // This object is the raw JSON you passed via --data-raw in cURL
      {
        "applied_filters": null,
        "monet_assets": [
          {
            "name": "ads_vertical_banner",
            "processed": 1,
            "total": 1
          }
        ],
        "postback_meta": {
          "boosted_product_ids": [570251],
          "primary_results_group_ids": [616423, 779594, 1868335, 1876146, 1901972, 1333142, 536054, 193372, 780285]
        },
        "previous_search_query": "kurkure",
        "processed_rails": {
          "attribute_rail": {
            "total_count": 0,
            "processed_count": 4,
            "processed_product_ids": []
          },
          "brand_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "keyterm_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "occasion_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "price_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "recipe_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "recipient_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "suggested_keyword_rail": {
            "total_count": 1,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "tag_rail": {
            "total_count": 0,
            "processed_count": 1,
            "processed_product_ids": []
          },
          "usecase_grid_rail": {
            "total_count": 0,
            "processed_count": 3,
            "processed_product_ids": []
          }
        },
        "sort": "",
        "vertical_cards_processed": 10
      },
      {
        // The headers object must mirror your cURL command’s headers
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'access_token': 'null',
          'app_client': 'consumer_web',
          'app_version': '1010101010',
          'auth_key': 'c761ec3633c22afad934fb17a66385c1c06c5472b4898b866b7306186d0bb477',
          'content-type': 'application/json',

          // Combine all cURL cookie data into one "cookie" header:
          'cookie': 'gr_1_deviceId=b7003891-76c2-4362-addd-274590aac269; gr_1_locality=1849; _gcl_aw=GCL.1741258145.CjwKCAiArKW-BhAzEiwAZ...etc...',

          'device_id': 'b7003891-76c2-4362-addd-274590aac269',
          'lat': '28.465204',
          'lon': '77.06159',
          'origin': 'https://blinkit.com',
          'priority': 'u=1, i',
          'referer': 'https://blinkit.com/s/?q=kurkure',
          'rn_bundle_version': '1009003012',
          'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'session_uuid': '9245a58d-bb4a-4803-b913-fcf674208502',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',
          'web_app_version': '1008010016'
        }
      }
    );

    console.log('Status:', response.status);
    console.log('Response data:', response.data);

  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Network error or no response:', error.message);
    }
  }
}

fetchBlinkitData();

