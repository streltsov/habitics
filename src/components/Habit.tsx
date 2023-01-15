import {
  Card,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Stack,
} from "@mui/material";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useState } from "react";
import { useHabitContribution } from "../hooks/useHabit";
import { HabitDocType } from "../schema";
import { compareAsc, subYears } from "date-fns";
import "./Habit.css";

interface HabitProps {
  habit: HabitDocType;
}

export const Habit = ({ habit }: HabitProps) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const { habitContributions, createHabitContribution } = useHabitContribution(
    habit.id
  );

  const handleContribute = () => {
    if (!amount) return;
    if (amount === 0) return;
    if (amount < 0) {
      alert("You want to contribute negative value. It is not possible");
    }

    createHabitContribution({ amount });
    setAmount(undefined);
  };

  const sorted = habitContributions
    .map(({ createdAt, amount }) => ({
      date: createdAt,
      count: amount,
    }))
    .map((habit) => ({ ...habit, date: habit.date.split("T")[0] }))
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  function mergeSortedContributions(xs: { date: string; count: number }[]) {
    const contributions: { date: string; count: number }[] = [];

    if (xs.length === 0) return contributions;

    for (let i = 0; i < xs.length; i++) {
      if (contributions[contributions.length - 1]?.date === xs[i]?.date) {
        contributions[contributions.length - 1].count =
          contributions[contributions.length - 1].count + xs[i].count;
      } else {
        contributions.push(xs[i]);
      }
    }

    return contributions;
  }

  return (
    <Card>
      <CardHeader title={habit.title} />
      <CardContent>
        <CalendarHeatmap
          startDate={subYears(new Date(), 1)}
          gutterSize={4}
          values={mergeSortedContributions(sorted)}
          classForValue={(value) => {
            if (!value) return "color-empty";

            if (value.count < 15) return `color-scale-1`;
            if (value.count < 25) return `color-scale-2`;
            if (value.count < 75) return `color-scale-3`;
            if (value.count <= 115) return `color-scale-4`;
            if (value.count > 115) return `color-scale-5`;
          }}
        />
        <Stack
          flexDirection="row"
          justifyContent="space-around"
          sx={{ mt: 4, mb: 4 }}
        >
          <TextField
            size="small"
            label="Amount"
            type="number"
            onChange={({ target }) => setAmount(Number(target.value))}
            value={amount}
          />
          <Button onClick={handleContribute}>Contribute</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
