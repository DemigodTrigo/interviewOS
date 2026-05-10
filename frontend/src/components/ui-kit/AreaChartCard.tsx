import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data?: {
    day: string;
    score: number;
  }[];
};

const defaultData = [
  { day: "#1", score: 40 },
  { day: "#2", score: 55 },
  { day: "#3", score: 48 },
  { day: "#4", score: 70 },
  { day: "#5", score: 76 },
  { day: "#6", score: 82 },
];

export function AreaChartCard({
  data = defaultData,
}: Props) {
  return (
    <div className="glass rounded-3xl p-5 h-[320px]">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Performance Trend
        </h3>

        <p className="text-sm text-muted-foreground">
          Interview performance analytics
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#8b5cf6"
                stopOpacity={0.7}
              />

              <stop
                offset="95%"
                stopColor="#8b5cf6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#ffffff10"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            stroke="#777"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[60, 100]}
            stroke="#777"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background:
                "#0f172a",
              border:
                "1px solid rgba(255,255,255,0.1)",
              borderRadius:
                "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}