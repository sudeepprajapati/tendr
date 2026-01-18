import { varchar, pgTable, pgEnum, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const questionDefficulties = ["easy", "medium", "hard"] as const;
export type questionDefficulty = (typeof questionDefficulties)[number];
export const questionDifficultyEnum = pgEnum(
    "questions_question_difficulty",
    questionDefficulties
);

export const QuestionTable = pgTable("questions", {
    id,
    jobInfoId: uuid()
        .references(() => JobInfoTable.id)
        .notNull(),
    text: varchar().notNull(),
    difficultyLevel: questionDifficultyEnum().notNull(),
    createdAt,
    updatedAt,
})

export const questionsRelations = relations(QuestionTable, ({ one }) => ({
    jobInfo: one(JobInfoTable, {
        fields: [QuestionTable.jobInfoId],
        references: [JobInfoTable.id],
    }),
}));