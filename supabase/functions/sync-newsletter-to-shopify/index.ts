import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const SHOPIFY_STORE_DOMAIN = "fuegooo-r6mv2.myshopify.com";
const SHOPIFY_ACCESS_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
const SHOPIFY_API_VERSION = "2025-01";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("sync-newsletter-to-shopify function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterSubscribeRequest = await req.json();
    
    console.log("Syncing newsletter subscriber to Shopify:", email);

    if (!SHOPIFY_ACCESS_TOKEN) {
      console.error("SHOPIFY_ACCESS_TOKEN is not configured");
      throw new Error("Shopify access token not configured");
    }

    // Use Shopify Admin API to create/update customer
    const shopifyUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/customers.json`;

    // First, check if customer already exists
    const searchUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/customers/search.json?query=email:${encodeURIComponent(email)}`;
    
    const searchResponse = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const searchData = await searchResponse.json();
    console.log("Search response:", JSON.stringify(searchData));

    if (searchData.customers && searchData.customers.length > 0) {
      // Customer exists, update their tags
      const existingCustomer = searchData.customers[0];
      const currentTags = existingCustomer.tags || "";
      const tagsArray = currentTags.split(",").map((t: string) => t.trim()).filter((t: string) => t);
      
      if (!tagsArray.includes("newsletter") && !tagsArray.includes("subscriber")) {
        tagsArray.push("newsletter", "subscriber");
        
        const updateUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/customers/${existingCustomer.id}.json`;
        const updateResponse = await fetch(updateUrl, {
          method: "PUT",
          headers: {
            "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: {
              id: existingCustomer.id,
              tags: tagsArray.join(", "),
              email_marketing_consent: {
                state: "subscribed",
                opt_in_level: "single_opt_in",
              },
            },
          }),
        });

        const updateData = await updateResponse.json();
        console.log("Updated existing customer:", JSON.stringify(updateData));
        
        return new Response(JSON.stringify({ success: true, action: "updated", customer: updateData.customer }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        console.log("Customer already has newsletter tags");
        return new Response(JSON.stringify({ success: true, action: "already_subscribed" }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } else {
      // Create new customer
      const createResponse = await fetch(shopifyUrl, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            email: email,
            tags: "newsletter, subscriber",
            email_marketing_consent: {
              state: "subscribed",
              opt_in_level: "single_opt_in",
            },
            accepts_marketing: true,
          },
        }),
      });

      const createData = await createResponse.json();
      console.log("Created new customer:", JSON.stringify(createData));

      if (createData.errors) {
        throw new Error(JSON.stringify(createData.errors));
      }

      return new Response(JSON.stringify({ success: true, action: "created", customer: createData.customer }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  } catch (error: any) {
    console.error("Error in sync-newsletter-to-shopify function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
