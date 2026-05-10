import { supabase } from "@/lib/supabase";

// GET RECENT INTERVIEWS
export async function getRecentInterviews(
  userId: string
) {
  const { data, error } =
    await supabase
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(10);

  if (error) {
    console.error(
      "Recent interviews error:",
      error
    );

    return [];
  }

  return data || [];
}

// GET SINGLE INTERVIEW
export async function getInterviewById(
  id: string
) {
  const { data, error } =
    await supabase
      .from("interviews")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(
      "Get interview error:",
      error
    );

    return null;
  }

  return data;
}

// SAVE INTERVIEW
export async function saveInterview(
  payload: any
) {
  const { data, error } =
    await supabase
      .from("interviews")
      .insert([payload])
      .select();

  if (error) {
    console.error(
      "Save interview error:",
      error
    );

    return null;
  }

  return data;
}