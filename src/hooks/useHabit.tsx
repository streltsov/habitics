import { get } from "../database";
import { useState, useEffect } from "react";
import { HabitDocType, HabitContributionDocType } from "../schema";
import { formatRFC3339 } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const useHabit = () => {
  const [habits, setHabits] = useState<HabitDocType[]>([]);

  useEffect(() => {
    (async () => {
      const db = await get();
      db.habits.find().$.subscribe(setHabits);
    })();
  }, []);

  type CreateHabitType = Pick<HabitDocType, "title" | "tags">;
  const createHabit = async ({ title, tags }: CreateHabitType) => {
    const db = await get();
    return db.habits.insert({
      title,
      tags,
      id: uuidv4(),
      createdAt: formatRFC3339(Date.now()),
    });
  };

  return {
    habits,
    createHabit,
  };
};

export const useHabitContribution = (
  parentId: HabitContributionDocType["parentId"]
) => {
  const [habitContributions, setHabitContributions] = useState<
    HabitContributionDocType[]
  >([]);

  useEffect(() => {
    (async () => {
      const db = await get();
      db.habitContributions.find().$.subscribe(setHabitContributions);
    })();
  }, []);

  type CreateHabitContributionType = Pick<
    HabitContributionDocType,
    "amount" | "description"
  >;

  const createHabitContribution = async ({
    amount,
    description,
  }: CreateHabitContributionType) => {
    const db = await get();
    return db.habitContributions.insert({
      amount,
      description,
      parentId,
      id: uuidv4(),
      createdAt: formatRFC3339(Date.now()),
    });
  };

  return {
    habitContributions,
    createHabitContribution,
  };
};
