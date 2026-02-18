import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const { method } = await req.json().catch(() => ({ method: "get" }));

    if (method === "increment") {
      // Increment and return
      const { data, error } = await supabase.rpc("increment_visitor_count");
      if (error) {
        // Fallback: manual update
        const { data: current } = await supabase
          .from("visitor_counter")
          .select("count")
          .eq("id", 1)
          .single();

        const newCount = (current?.count ?? 1276) + 1;
        await supabase
          .from("visitor_counter")
          .update({ count: newCount, updated_at: new Date().toISOString() })
          .eq("id", 1);

        return new Response(JSON.stringify({ count: newCount }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ count: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET: just return count
    const { data, error } = await supabase
      .from("visitor_counter")
      .select("count")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ count: data.count }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
