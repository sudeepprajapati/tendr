import { varchar, pgTable, pgEnum } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";
import { QuestionTable } from "./question";
import { InterviewTable } from "./interview";

export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export type experienceLevels = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum("job_info_experience_level", experienceLevels);

export const JobInfoTable = pgTable("job_info", {
    id,
    title: varchar(),
    name: varchar().notNull(),
    experience: experienceLevelEnum().notNull(),
    userId: varchar().references(() => UserTable.id, { onDelete: "cascade" })
        .notNull(),
    createdAt,
    updatedAt,
})

export const jobInfoRelations = relations(JobInfoTable, ({ one, many }) => ({
    user: one(UserTable, {
        fields: [JobInfoTable.userId],
        references: [UserTable.id],
    }),
    question: many(QuestionTable),
    interiviews: many(InterviewTable)
}));