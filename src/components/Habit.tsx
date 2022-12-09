import { Card, Typography, TextField, Button, Box } from "@mui/material";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useState } from "react";
import { useHabitContribution } from "../hooks/useHabit";
import { HabitDocType } from "../schema";
import { compareAsc } from "date-fns";

interface HabitProps {
  habit: HabitDocType;
}

export const Habit = ({ habit }: HabitProps) => {
  const [amount, setAmount] = useState(0);

  const { habitContributions, createHabitContribution } = useHabitContribution(
    habit.id
  );

  const handleContribute = () => {
    if (amount === 0) return;
    if (amount < 0) {
      alert("You want to contribute negative value. It is not possible");
    }

    createHabitContribution({ amount });
    setAmount(0);
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
    <Card key={habit.id}>
      <Typography variant="h6">{habit.title}</Typography>
      <Box height="100px" width="400px">
        <CalendarHeatmap values={mergeSortedContributions(sorted)} />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <TextField
          size="small"
          label="Amount"
          type="number"
          onChange={({ target }) => setAmount(Number(target.value))}
          value={amount}
        />
        <Button onClick={handleContribute}>Contribute</Button>
      </Box>
    </Card>
  );
};
