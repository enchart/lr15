import { relations, sql } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./auth";

export const shapes = sqliteTable("shapes", {
  id: text().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  color: text().notNull(),
});

export const shapesRelations = relations(shapes, ({ many }) => ({
  prices: many(shapePrices),
  news: many(shapeNews),
}));

export const shapePrices = sqliteTable("shape_prices", {
  id: integer().primaryKey({ autoIncrement: true }),
  shapeId: text("shape_id")
    .notNull()
    .references(() => shapes.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
  price: integer().notNull(),
});

export const shapePricesRelations = relations(shapePrices, ({ one }) => ({
  shape: one(shapes, {
    fields: [shapePrices.shapeId],
    references: [shapes.id],
  }),
}));

export const shapeNews = sqliteTable("shape_news", {
  id: integer().primaryKey({ autoIncrement: true }),
  shapeId: text("shape_id")
    .notNull()
    .references(() => shapes.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  price: integer().notNull(),
});

export const shapeNewsRelations = relations(shapeNews, ({ one }) => ({
  shape: one(shapes, {
    fields: [shapeNews.shapeId],
    references: [shapes.id],
  }),
}));

export const usersShapes = sqliteTable(
  "users_shapes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    shapeId: text("shape_id")
      .notNull()
      .references(() => shapes.id, { onDelete: "cascade" }),
    amount: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.shapeId] })]
);

export const usersShapesRelations = relations(usersShapes, ({ one }) => ({
  user: one(users, {
    fields: [usersShapes.userId],
    references: [users.id],
  }),
  shape: one(shapes, {
    fields: [usersShapes.shapeId],
    references: [shapes.id],
  }),
}));
