import { PieChart } from '@mui/x-charts/PieChart';

type DiferenceDisplayProps = {
    caloriesBurned: number;
    caloriesConsumed: number;
}
export default function DiferenceDisplay({caloriesBurned, caloriesConsumed }: DiferenceDisplayProps) {
  return (
        <PieChart 
            series={[
                {
                data: [
                    { id: 0, value: caloriesBurned, color: '#f97316', },
                    { id: 1, value: caloriesConsumed, color: '#22c55e'},
                    ],
                },
            ]}
            width={130}
            height={130}
            />
  )
}
