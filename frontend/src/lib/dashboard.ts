import { supabase } from "@/lib/supabase";

export async function getDashboardStats(
  userId: string
) {
  console.log(
    "Fetching dashboard for:",
    userId
  );

  const { data, error } =
    await supabase
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "Dashboard error:",
      error
    );

    return {
      totalInterviews: 0,
      averageScore: 0,
      recentInterviews: [],
      chartData: [],
    };
  }

  console.log(
    "Dashboard rows:",
    data
  );

  const totalInterviews =
    data?.length || 0;

  const scores =
    data
      ?.map((i) =>
        Number(i.score || 0)
      )
      .filter((s) => s > 0) || [];

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (a, b) => a + b,
            0
          ) / scores.length
        )
      : 0;

  // REAL CHART DATA
  const chartData =
    data
      ?.slice()
      .reverse()
      .map((item, index) => ({
        day: new Date(
            item.created_at
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        score:
          Number(item.score) || 0,
      })) || [];

  return {
    totalInterviews,
    averageScore,
    recentInterviews:
      data?.slice(0, 5) || [],
    chartData,
  };
}