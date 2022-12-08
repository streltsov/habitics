import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { HabitDocType } from "../schema";

interface HabitProps {
  habit: HabitDocType;
}

export const Habit = ({ habit }: HabitProps) => {
  const [amount, setAmount] = useState(0);

  const handleContribute = () => {
    console.log({ amount });
  };

  return (
    <Card key={habit.id}>
      <Typography variant="h6">{habit.title}</Typography>
      <TextField
        size="small"
        label="Amount"
        type="number"
        onChange={({ target }) => setAmount(Number(target.value))}
        value={amount}
      />
      <Button onClick={handleContribute}>Contribute</Button>
    </Card>
  );
};
