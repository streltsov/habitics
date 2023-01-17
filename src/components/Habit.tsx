import {
  Card,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Stack,
} from "@mui/material";
import { HabitCardMenu } from "../components/HabitCardMenu";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useState } from "react";
import { useHabitContribution } from "../hooks/useHabit";
import { HabitDocType } from "../schema";
import { compareAsc, isToday, subYears } from "date-fns";
import "./Habit.css";

interface HabitProps {
  habit: HabitDocType;
}

export const Habit = ({ habit }: HabitProps) => {
  const [amount, setAmount] = useState<number>(0);

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

  const getClassName = (amountOfContribution: number, className: string) => {
    null;
    if (!amountOfContribution) return "card-color-empty";

    if (amountOfContribution < 15) return `${className}-1`;
    if (amountOfContribution < 25) return `${className}-2`;
    if (amountOfContribution < 75) return `${className}-3`;
    if (amountOfContribution <= 115) return `${className}-4`;
    if (amountOfContribution > 115) return `${className}-5`;
  };

  console.log(
    habit.title,
    mergeSortedContributions(sorted).filter(({ date }) =>
      isToday(new Date(date))
    )
  );

  const todaysContributions: number =
    mergeSortedContributions(sorted).filter(({ date }) =>
      isToday(new Date(date))
    )[0]?.count || 0;

  return (
    <Card className={getClassName(todaysContributions, "card-color-scale")}>
      <CardHeader
        title={habit.title}
        action={<HabitCardMenu id={habit.id} />}
      />
      <CardContent>
        <CalendarHeatmap
          startDate={subYears(new Date(), 1)}
          gutterSize={4}
          values={mergeSortedContributions(sorted)}
          classForValue={(value) =>
            getClassName(value?.count || 0, "color-scale")
          }
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
            value={amount || ""}
          />
          <Button onClick={handleContribute}>Contribute</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
